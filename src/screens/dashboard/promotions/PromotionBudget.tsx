import React, {useCallback, useState} from 'react';
import {Box, Button, FormInput, Text} from 'design-system';
import {AvoidingView, Header, HeaderText, Icon, Loader, Screen} from 'shared';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {DashboardStackParamList} from 'types';
import {fontSz, hp, wp} from 'utils';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import DatePicker from 'react-native-date-picker';
import {SelectFrequency, useForceUpdate} from './modals';
import theme from 'theme';
import {ScrollView} from 'react-native';
import moment from 'moment';
import {useCalculateBiddingSplit} from 'store/usePromotion';
import {showMessage} from 'react-native-flash-message';

interface FormData {
  frequency: string;
  password: string;
  startDate: string;
  endDate: string;
  amount: string;
}

const schema = yup.object().shape({
  frequency: yup.string().required('Frequency is required'),
  password: yup.string().required('Password is required'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().required('End date is required'),
  amount: yup.string().required('Amount is required'),
});

export const PromotionBudget = () => {
  const {goBack} = useNavigation<NavigationProp<DashboardStackParamList>>();
  const {payload} =
    useRoute<RouteProp<DashboardStackParamList, 'PromotionBudget'>>()?.params;
  const {navigate} = useNavigation<NavigationProp<DashboardStackParamList>>();

  const [open, setOpen] = useState<
    'frequency' | 'end-date' | 'start-date' | ''
  >('');
  const forceUpdate = useForceUpdate();

  const {
    control,
    setValue,
    watch,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      frequency: '',
      password: '',
      startDate: '',
      endDate: '',
      amount: '',
    },
    mode: 'all',
  });

  const form = watch();

  const onComplete = async (value: string) => {
    setOpen('');
    setValue('frequency', value);
    // Save the frequency to the backend
  };

  const handleAmountChange = (value: string) => {
    const numberAmount = Number(value.replace(/\D/g, ''));
    const formattedValue = (Number(numberAmount) || '').toLocaleString();
    setValue('amount', formattedValue);
  };

  const {mutate, isPending} = useCalculateBiddingSplit({
    onSuccess: (response: any) => {
      if (response?.status === 'failed') {
        return showMessage({
          message: response?.message,
          type: 'danger',
          duration: 2000,
        });
      }
      if (response?.status === 'success') {
        // Sum the amount values from the response.data array
        const totalAmount = response?.data?.reduce((sum: number, item: any) => {
          return sum + (item.amount || 0);
        }, 0);

        // Get the proposed budget amount (remove commas and convert to number)
        const proposedAmount = Number(form.amount?.split(',')?.join(''));

        if (totalAmount > proposedAmount) {
          const shortfall = totalAmount - proposedAmount;
          showMessage({
            message: `Total bid amount (₦${totalAmount.toLocaleString()}) exceeds your proposed budget (₦${proposedAmount.toLocaleString()}). You need ₦${shortfall.toLocaleString()} more to cover the expenses.`,
            type: 'danger',
            duration: 3000,
          });
        } else if (totalAmount < proposedAmount) {
          console.log('totalAmount < proposedAmount');
          const excess = proposedAmount - totalAmount;
          showMessage({
            message: `Total cost (₦${totalAmount.toLocaleString()}) is less than your proposed budget (₦${proposedAmount.toLocaleString()}). You have ₦${excess.toLocaleString()} remaining. Please adjust your budget to match the exact cost.`,
            type: 'danger',
            duration: 3000,
          });
        } else {
          showMessage({
            message: `Perfect! Total cost (₦${totalAmount.toLocaleString()}) matches your proposed budget (₦${proposedAmount.toLocaleString()}). Proceeding to checkout.`,
            type: 'success',
            duration: 3000,
          });
          navigate('PromotionCheckout', {
            data: {
              amount: form.amount,
              frequency: form.frequency,
              startDate: form.startDate,
              endDate: form.endDate,
              responseData: response?.data,
              ...payload,
            },
          });
        }
      }
    },
  });

  const continueProcess = useCallback(() => {
    const promoters: any[] = [];
    payload?.activePromoters?.map(promoter => {
      promoters.push({promoterId: promoter.userId});
    });
    mutate({
      promotionId: payload.discographyId,
      frequency: form.frequency?.toLowerCase(),
      startDate: moment(form.startDate).format('YYYY-MM-DD'),
      endDate: moment(form.endDate).format('YYYY-MM-DD'),
      bidAmount: Number(form.amount?.split(',')?.join('')),
      promoters,
    });
  }, [form, mutate, payload]);

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.BASE_PRIMARY}>
      <Header hasBackText="Set up Promotion" onPressLeftIcon={goBack} />
      <AvoidingView>
        <ScrollView>
          <HeaderText
            hasHeaderText="Fill Audio details for promotion"
            hasHeaderTextStyle={{fontSize: fontSz(14)}}
            hasIndicatorLevel
            currentPage={3}
          />

          <Box mt={hp(20)} mx={wp(16)}>
            <FormInput
              control={control}
              name="frequency"
              label="Frequency"
              editable={false}
              isDropDown
              errorText={errors.frequency?.message}
              onPressDropDown={() => setOpen('frequency')}
            />

            <FormInput
              control={control}
              name="startDate"
              label="Select start date"
              isDate
              value={
                form.startDate
                  ? moment(form.startDate).format('YYYY-MM-DD')
                  : ''
              }
              editable={false}
              errorText={errors.startDate?.message}
              onPressDropDown={() => setOpen('start-date')}
            />
            <FormInput
              control={control}
              name="endDate"
              label="Select end date"
              isDate
              value={
                form.endDate ? moment(form.endDate).format('YYYY-MM-DD') : ''
              }
              editable={false}
              errorText={errors.endDate?.message}
              onPressDropDown={() => setOpen('end-date')}
            />

            <Box
              borderBottomWidth={1}
              borderBottomColor={theme.colors.BASE_SECONDARY}
            />

            <Text
              variant="body"
              pt={hp(20)}
              fontSize={fontSz(14)}
              color={theme.colors.WHITE}>
              Budget
            </Text>

            <Box
              flexDirection={'row'}
              alignItems={'center'}
              mt={hp(24)}
              justifyContent={'space-between'}>
              <Box
                flexDirection={'row'}
                alignItems={'center'}
                height={hp(59)}
                borderRadius={hp(24)}
                width={wp(98)}
                px={wp(20)}
                justifyContent={'space-between'}
                bg={theme.colors.TEXT_INPUT_BG}>
                <Text variant="body" color={theme.colors.WHITE}>
                  NGN
                </Text>
                <Icon name="chevron-down" />
              </Box>

              <FormInput
                control={control}
                containerStyle={{width: wp(230), marginBottom: hp(0)}}
                name="amount"
                onChangeText={(text: string) => handleAmountChange(text)}
                label="Enter budget amount"
                errorText={errors.amount?.message}
                keyboardType="number-pad"
                returnKeyType="done"
              />
            </Box>
          </Box>
        </ScrollView>
      </AvoidingView>
      <SelectFrequency
        isVisible={open === 'frequency'}
        onClose={() => setOpen('')}
        onComplete={onComplete}
      />

      <DatePicker
        modal
        open={open === 'start-date' || open === 'end-date'}
        mode="date"
        date={new Date()}
        minimumDate={
          open === 'end-date' ? new Date(form.startDate) : new Date()
        }
        onConfirm={selectedDate => {
          if (open === 'start-date') {
            setOpen('');
            setValue('startDate', selectedDate?.toISOString());
            forceUpdate();
          } else if (open === 'end-date') {
            setOpen('');
            setValue('endDate', selectedDate?.toISOString());
            forceUpdate();
          }
        }}
        onCancel={() => {
          setOpen('');
        }}
      />

      <Button
        title="Continue"
        hasBorder
        disabled={
          form.amount && form.endDate && form.frequency && form.startDate
            ? false
            : true
        }
        onPress={continueProcess}
      />

      <Loader loading={isPending} />
    </Screen>
  );
};
