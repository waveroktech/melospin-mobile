import React, {useState} from 'react';
import {Box, Button, FormInput, Text} from 'design-system';
import {AvoidingView, Header, HeaderText, Icon, Screen} from 'shared';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {BackHandler, ScrollView, TouchableOpacity} from 'react-native';
import {SelectTimeline} from './modals';
import {
  NavigationProp,
  RouteProp,
  StackActions,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {DashboardStackParamList} from 'types';
import {styles} from './style';
import DatePicker from 'react-native-date-picker';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import moment from 'moment';
import {PromotionTypeSelector} from 'screens/auth/select-profile/components';

interface FormData {
  date: string;
  timeline: string;
  promotionTypes: string[];
}

const schema = yup.object().shape({
  date: yup.string().required('Date is required'),
  timeline: yup.string().required('Timeline is required'),
  promotionTypes: yup
    .array()
    .of(yup.string().required())
    .required('Promotion types are required'),
});

export const AddDjs = () => {
  const [open, setOpen] = useState<
    'select-dj' | 'date' | 'select-timeline' | ''
  >('');

  const {data} =
    useRoute<RouteProp<DashboardStackParamList, 'AddDjs'>>()?.params;

  const {navigate, goBack, dispatch} =
    useNavigation<NavigationProp<DashboardStackParamList>>();

  const {
    control,
    watch,
    setValue,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      date: '',
      timeline: '',
      promotionTypes: [],
    },
    mode: 'all',
  });

  const form = watch();

  const onCompleteTimeline = async (timeline: string) => {
    setOpen('');
    setValue('timeline', timeline);
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (open === 'select-dj') {
          setOpen(''); // Handle modal close
          return true; // Prevent screen from going back
        }
        return false; // Allow default navigation
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => backHandler.remove();
    }, [open]),
  );

  const continueProcess = async () => {
    navigate('PromotionBudget', {
      payload: {
        ...data,
        promotionTypes: form.promotionTypes,
        timeline: form?.timeline,
        date: form?.date,
      },
    });
  };

  return (
    <Screen removeSafeaArea>
      <Header hasBackText="Set up Promotion" onPressLeftIcon={goBack} />
      <HeaderText
        hasHeaderText="Fill promotion details"
        hasHeaderTextStyle={{fontSize: fontSz(14)}}
        hasIndicatorLevel
        currentPage={2}
      />

      <AvoidingView>
        <ScrollView>
          <Box mx={wp(16)} mt={hp(24)}>
            <Box
              style={styles.calendarContainer}
              as={TouchableOpacity}
              onPress={() => setOpen('date')}
              activeOpacity={0.8}>
              <Icon name="calendar-icon" />
              <Text
                style={styles.calendarText}
                variant={form.date ? 'bodyMedium' : 'body'}>
                {form.date
                  ? moment(form.date).format('DD - MM - YYYY')
                  : 'Select Date'}
              </Text>
            </Box>

            <FormInput
              control={control}
              name="timeline"
              label="Select Timeline (Monthly)"
              value={form.timeline}
              errorText={errors.timeline?.message}
              isDropDown
              onPressDropDown={() => setOpen('select-timeline')}
            />

            <Box flexDirection={'row'} bottom={hp(12)} mb={hp(24)}>
              <Icon name="info-icon" />
              <Text
                variant="body"
                color={theme.colors.WHITE}
                ml={wp(2)}
                width={wp(300)}
                fontSize={fontSz(12)}>
                The promotion will be played at least 12 times each month, with
                proof verified by our team.
              </Text>
            </Box>

            <Controller
              control={control}
              name="promotionTypes"
              render={({field: {onChange, value}}) => (
                <PromotionTypeSelector
                  value={value}
                  title="Preferred promotion type"
                  onChange={onChange}
                  onSelectAll={() => {}}
                />
              )}
            />
          </Box>
        </ScrollView>
      </AvoidingView>

      <Box
        flexDirection={'row'}
        justifyContent={'space-between'}
        mx={wp(16)}
        bottom={hp(20)}>
        <Button
          title="Cancel Promo"
          onPress={() => dispatch(StackActions.pop(2))}
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
          onPress={continueProcess}
          hasBorder
          isNotBottom
          disabled={
            form.date && form.timeline && form.promotionTypes?.length > 0
              ? false
              : true
          }
          width={wp(344) / 2}
          bg={theme.colors.PRIMARY_100}
        />
      </Box>

      <DatePicker
        modal
        open={open === 'date'}
        mode="date"
        date={new Date()}
        minimumDate={new Date()}
        onConfirm={selectedDate => {
          setOpen('');
          setValue('date', selectedDate?.toISOString());
        }}
        onCancel={() => {
          setOpen('');
        }}
      />

      <SelectTimeline
        isVisible={open === 'select-timeline'}
        onClose={() => setOpen('')}
        onComplete={onCompleteTimeline}
      />
    </Screen>
  );
};
