/* eslint-disable @typescript-eslint/no-shadow */
import React, {useCallback, useEffect, useState} from 'react';
import {Box, Button, FormInput, Text} from 'design-system';
import {AvoidingView, Header, HeaderText, Icon, Loader, Screen} from 'shared';
import {
  NavigationProp,
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {DashboardStackParamList} from 'types';
import {fontSz, hp, wp} from 'utils';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import DatePicker from 'react-native-date-picker';
import {SelectFrequency, SelectRate, useForceUpdate} from './modals';
import theme from 'theme';
import {FlatList, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {useCalculateBiddingSplit} from 'store/usePromotion';
import {showMessage} from 'react-native-flash-message';
import {FilterTabs, SelectDjItem, SelectDjItemComponent} from './components';
import {SelectState} from 'screens/auth/select-profile/modals';
import {styles} from './style';
import {useGetDjs} from 'store';

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
  const {goBack, dispatch} =
    useNavigation<NavigationProp<DashboardStackParamList>>();
  const {payload} =
    useRoute<RouteProp<DashboardStackParamList, 'PromotionBudget'>>()?.params;
  const {navigate} = useNavigation<NavigationProp<DashboardStackParamList>>();
  const [selectedRate, setSelectedRate] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedDjs, setSelectedDjs] = useState<any[]>([]);
  const [showSelectedDjs, setShowSelectedDjs] = useState(false);

  const {data, isPending: isDjsPending, refetch: refetchDjs} = useGetDjs();

  useEffect(() => {
    refetchDjs();
  }, [refetchDjs]);

  const [open, setOpen] = useState<
    'frequency' | 'end-date' | 'start-date' | 'rate' | 'state' | ''
  >('');
  const forceUpdate = useForceUpdate();

  console.log(data?.data, 'data');

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

  const continueProcess = () => {
    // const promoters: any[] = [];
    // selectedDjs?.map(dj => {
    //   promoters.push({promoterId: dj.userId});
    // });
    // mutate({
    //   promotionId: payload.discographyId,
    //   frequency: form.frequency?.toLowerCase(),
    //   startDate: moment(form.startDate).format('YYYY-MM-DD'),
    //   endDate: moment(form.endDate).format('YYYY-MM-DD'),
    //   bidAmount: Number(form.amount?.split(',')?.join('')),
    //   promoters,
    // });

    navigate('PromotionCheckout', {
      data: {
        responseData: selectedDjs,
        ...payload,
      },
    });
  };

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.BASE_PRIMARY}>
      <Header hasBackText="Set up Promotion" onPressLeftIcon={goBack} />
      <AvoidingView>
        <ScrollView>
          <HeaderText
            hasHeaderText="Assign DJs"
            hasHeaderTextStyle={{fontSize: fontSz(14)}}
            hasIndicatorLevel
            currentPage={3}
          />

          <FilterTabs
            title="Filter Tab"
            selectedRate={selectedRate}
            selectedState={selectedState}
            setOpen={(open: string) =>
              setOpen(
                open as '' | 'rate' | 'frequency' | 'end-date' | 'start-date',
              )
            }
          />

          <Box
            style={styles.searchInputContainer}
            mx={wp(16)}
            mt={hp(20)}
            bg={theme.colors.TEXT_INPUT_BG}>
            <Icon name="search-icon" />
            <TextInput
              style={styles.searchTextInput}
              placeholder="Search DJ"
              selectionColor={theme.colors.WHITE}
              placeholderTextColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
            />
          </Box>

          <FlatList
            data={data?.data}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({item}) => (
              <SelectDjItemComponent
                item={item}
                onPress={(dj: any) => {
                  setSelectedDjs(prevDjs => {
                    const isAlreadySelected = prevDjs.some(
                      (selectedDj: any) => selectedDj?.userId === dj?.userId,
                    );
                    if (isAlreadySelected) {
                      // Remove DJ if already selected
                      return prevDjs.filter(
                        (selectedDj: any) => selectedDj?.userId !== dj?.userId,
                      );
                    } else {
                      // Add DJ if not selected
                      return [...prevDjs, dj];
                    }
                  });
                }}
                selectedDjs={selectedDjs}
              />
            )}
          />

          {/* <Box mt={hp(20)} mx={wp(16)}>
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
          </Box> */}
        </ScrollView>
      </AvoidingView>
      {selectedDjs.length > 0 && (
        <Box
          mt={hp(24)}
          mx={wp(16)}
          position={'absolute'}
          bottom={hp(100)}
          left={0}
          right={0}>
          <Box bg={theme.colors.BLACK_DEFAULT} p={hp(24)} borderRadius={hp(24)}>
            <Box
              as={TouchableOpacity}
              activeOpacity={0.8}
              onPress={() => setShowSelectedDjs(!showSelectedDjs)}
              flexDirection={'row'}
              mb={showSelectedDjs ? hp(16) : 0}
              alignItems={'center'}
              justifyContent={'space-between'}>
              <Text variant="bodyMedium" color={theme.colors.WHITE}>
                ({selectedDjs.length}) DJs Added
              </Text>

              <Box>
                <Icon name={showSelectedDjs ? 'arrow-up-2' : 'arrow-down-2'} />
              </Box>
            </Box>

            {showSelectedDjs && (
              <Box mt={hp(16)}>
                {selectedDjs.map((dj: any, index: number) => (
                  <Box
                    key={dj?.userId || index}
                    flexDirection={'row'}
                    alignItems={'center'}
                    pb={hp(16)}
                    borderBottomWidth={index < selectedDjs.length - 1 ? 1 : 0}
                    borderBottomColor={theme.colors.BASE_SECONDARY}
                    mb={index < selectedDjs.length - 1 ? hp(16) : 0}>
                    <Box
                      as={TouchableOpacity}
                      activeOpacity={0.8}
                      onPress={() => {
                        setSelectedDjs(prevDjs =>
                          prevDjs.filter(
                            (selectedDj: any) =>
                              selectedDj?.userId !== dj?.userId,
                          ),
                        );
                      }}
                      width={wp(32)}
                      height={hp(24)}
                      borderRadius={hp(16)}
                      bg={theme.colors.WHITE}
                      alignItems={'center'}
                      justifyContent={'center'}>
                      <Icon name="trash-3" />
                    </Box>

                    <Text
                      variant="bodyMedium"
                      pl={wp(12)}
                      color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                      {dj?.name}
                    </Text>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      )}
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

      <Box
        flexDirection={'row'}
        justifyContent={'space-between'}
        mx={wp(16)}
        bottom={hp(20)}>
        <Button
          title="Cancel Promo"
          onPress={() => dispatch(StackActions.pop(3))}
          isNotBottom
          width={wp(160)}
          icon="cancel-promo"
          hasIcon
          hasBorder
          textColor={theme.colors.ERROR_TONE}
          backgroundColor={theme.colors.PRIMARY}
          borderColor={theme.colors.BASE_SECONDARY}
        />

        <Button
          title="Continue"
          hasBorder
          isNotBottom
          disabled={selectedDjs.length > 0 ? false : true}
          width={wp(160)}
          onPress={continueProcess}
        />
      </Box>

      <Loader loading={isPending} />

      <SelectState
        isVisible={open === 'state'}
        onClose={() => setOpen('')}
        onSelectState={(state: any) => {
          setOpen('');
          setSelectedState(state?.state);
        }}
      />

      <SelectRate
        isVisible={open === 'rate'}
        onClose={() => setOpen('')}
        onComplete={(rate: string) => {
          setOpen('');
          setSelectedRate(rate);
        }}
      />
    </Screen>
  );
};
