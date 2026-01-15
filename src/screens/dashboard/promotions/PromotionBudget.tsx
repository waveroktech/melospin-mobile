/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState} from 'react';
import {Box, Button} from 'design-system';
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
import {FlatList, ScrollView, TextInput} from 'react-native';
import {
  EmptyPromotionContainer,
  FilterTabs,
  SelectDjItemComponent,
  SelectedDjsList,
} from './components';
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
  const [searchQuery, setSearchQuery] = useState<string>('');

  const {data, isPending: isDjsPending, refetch: refetchDjs} = useGetDjs();

  useEffect(() => {
    refetchDjs();
  }, [refetchDjs]);

  const [open, setOpen] = useState<
    'frequency' | 'end-date' | 'start-date' | 'rate' | 'state' | ''
  >('');
  const forceUpdate = useForceUpdate();

  const {setValue, watch} = useForm<FormData>({
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

  // Helper function to parse rate range
  const parseRateRange = (rateString: string): {min?: number; max?: number} => {
    if (!rateString) {
      return {};
    }

    // Handle "< ₦100,000"
    if (rateString.includes('<')) {
      const max = parseFloat(rateString.replace(/[^0-9.]/g, ''));
      return {max: max - 1};
    }

    // Handle "> ₦5,000,000"
    if (rateString.includes('>')) {
      const min = parseFloat(rateString.replace(/[^0-9.]/g, ''));
      return {min: min + 1};
    }

    // Handle "₦100,000 - ₦499,000"
    if (rateString.includes('-')) {
      const parts = rateString.split('-');
      const min = parseFloat(parts[0].replace(/[^0-9.]/g, ''));
      const max = parseFloat(parts[1].replace(/[^0-9.]/g, ''));
      return {min, max};
    }

    return {};
  };

  // Filter DJs based on search query, rate, and state
  const filteredDjs = React.useMemo(() => {
    if (!data?.data) {
      return [];
    }

    return data.data.filter((dj: any) => {
      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const djName = dj?.name?.toLowerCase() || '';
        if (!djName.includes(query)) {
          return false;
        }
      }

      // Filter by rate range
      if (selectedRate) {
        const rateRange = parseRateRange(selectedRate);
        const djRate = parseFloat(dj?.chargePerPlay?.toString() || '0');

        if (rateRange.min !== undefined && djRate < rateRange.min) {
          return false;
        }
        if (rateRange.max !== undefined && djRate > rateRange.max) {
          return false;
        }
      }

      // Filter by state
      if (selectedState) {
        const djState = dj?.address?.state || '';
        if (djState.toLowerCase() !== selectedState.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [data?.data, searchQuery, selectedRate, selectedState]);

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
        resetFilters={() => {
          setSelectedRate('');
          setSelectedState('');
        }}
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
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </Box>

      <FlatList
        data={filteredDjs}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(item, index) => item?.userId || index.toString()}
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
        ListEmptyComponent={
          <EmptyPromotionContainer
            icon="empty-folder"
            title={
              searchQuery || selectedRate || selectedState
                ? 'No DJs Found'
                : 'No DJs Available'
            }
            subTitle={
              searchQuery || selectedRate || selectedState
                ? 'Try adjusting your filters or search query'
                : 'There are no DJs available at the moment'
            }
            containerStyles={{my: hp(100)}}
          />
        }
      />
      <ScrollView>
        <SelectedDjsList
          selectedDjs={selectedDjs}
          onRemoveDj={(dj: any) => {
            setSelectedDjs(prevDjs =>
              prevDjs.filter(
                (selectedDj: any) => selectedDj?.userId !== dj?.userId,
              ),
            );
          }}
        />
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
        selectedState={selectedState}
        onSelectState={(state: any) => {
          setOpen('');
          // Toggle selection: if the same state is selected, deselect it
          if (selectedState === state?.state) {
            setSelectedState('');
          } else {
            setSelectedState(state?.state);
          }
        }}
      />

      <SelectRate
        isVisible={open === 'rate'}
        onClose={() => setOpen('')}
        selectedRate={selectedRate}
        onComplete={(rate: string) => {
          setOpen('');
          // Toggle selection: if the same rate is selected, deselect it
          if (selectedRate === rate) {
            setSelectedRate('');
          } else {
            setSelectedRate(rate);
          }
        }}
      />
    </Screen>
  );
};
