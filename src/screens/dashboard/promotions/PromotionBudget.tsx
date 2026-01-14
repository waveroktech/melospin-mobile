/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState} from 'react';
import {Box, Button, Text} from 'design-system';
import {Header, HeaderText, Icon, Loader, Screen} from 'shared';
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
import {FilterTabs, SelectDjItemComponent} from './components';
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

  const continueProcess = () => {
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
          setOpen(open as '' | 'rate' | 'frequency' | 'end-date' | 'start-date')
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
      <ScrollView>
        {selectedDjs.length > 0 && (
          <Box
            mt={hp(24)}
            mx={wp(16)}
            position={'absolute'}
            bottom={hp(100)}
            left={0}
            right={0}>
            <Box
              bg={theme.colors.BLACK_DEFAULT}
              p={hp(24)}
              borderRadius={hp(24)}>
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
                  <Icon
                    name={showSelectedDjs ? 'arrow-up-2' : 'arrow-down-2'}
                  />
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
      </ScrollView>
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

      <Loader loading={isDjsPending} />

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
