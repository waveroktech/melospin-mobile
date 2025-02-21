import React, {useState} from 'react';
import {Box, FormInput, Text} from 'design-system';
import {Header, HeaderText, Screen} from 'shared';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {DashboardStackParamList} from 'types';
import {fontSz, hp, wp} from 'utils';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {SelectFrequency} from './modals';
import theme from 'theme';

interface FormData {
  frequency: string;
  password: string;
}

const schema = yup.object().shape({
  frequency: yup.string().required(),
  password: yup.string().required(),
});

export const PromotionBudget = () => {
  const {goBack} = useNavigation<NavigationProp<DashboardStackParamList>>();

  const [open, setOpen] = useState<'frequency' | ''>('');

  const {control, setValue, watch} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      frequency: '',
      password: '',
    },
    mode: 'all',
  });

  const form = watch();

  const onComplete = async (value: string) => {
    setOpen('');
    setValue('frequency', value);
    // Save the frequency to the backend
  };

  return (
    <Screen removeSafeaArea>
      <Header hasBackText="Set up Promotion" onPressLeftIcon={goBack} />
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
          isDropDown
          onPressDropDown={() => setOpen('frequency')}
        />
        <FormInput
          control={control}
          name="frequency"
          label="Frequency"
          isDropDown
          onPressDropDown={() => setOpen('frequency')}
        />
        <FormInput
          control={control}
          name="frequency"
          label="Frequency"
          isDropDown
          onPressDropDown={() => setOpen('frequency')}
        />

        <Box
          borderBottomWidth={1}
          borderBottomColor={theme.colors.BASE_SECONDARY}
        />

        <Text variant="body" fontSize={fontSz(14)} color={theme.colors.WHITE}>
          Budget
        </Text>
      </Box>

      <SelectFrequency
        isVisible={open === 'frequency'}
        onClose={() => setOpen('')}
        onComplete={onComplete}
      />
    </Screen>
  );
};
