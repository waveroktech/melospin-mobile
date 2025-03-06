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
import {fontSz, formatNumberWithCommas, hp, wp} from 'utils';
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
  frequency: yup.string().required(),
  password: yup.string().required(),
  startDate: yup.string().required(),
  endDate: yup.string().required(),
  amount: yup.string().required(),
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

  const {control, setValue, watch} = useForm<FormData>({
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
    setValue('amount', formatNumberWithCommas(value));
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
        showMessage({
          message: 'Bidding split calculated successfully',
          type: 'success',
          duration: 2000,
        });
        navigate('PromotionCheckout', {
          data: {
            amount: form.amount,
            ...payload,
            ...response?.data,
          },
        });
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
