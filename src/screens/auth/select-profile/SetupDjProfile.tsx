import React, {useState} from 'react';
import {Box, Button, FormInput, Text} from 'design-system';
import {AvoidingView, Header, HeaderText, Icon, Screen} from 'shared';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {ScrollView} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {PromotionTypeSelector} from './components';
import {SelectState} from './modals';

interface FormData {
  brandName: string;
  instagram: string;
  tictok: string;
  snapchat: string;
  country: string;
  state: string;
  title: string;
  location: string;
  promotionTypes: string[];
}

const schema = yup.object().shape({
  brandName: yup.string().required('Brand name is required'),
  instagram: yup.string().required('Instagram handle is required'),
  tictok: yup.string().required('TikTok handle is required'),
  snapchat: yup.string().required('Snapchat handle is required'),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  title: yup.string().required('Title is required'),
  location: yup.string().required('Location is required'),
  promotionTypes: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Promotion types are required')
    .required('Promotion types are required'),
});

export const SetupDjProfile = () => {
  const [open, setOpen] = useState<'country' | 'state' | ''>('');
  const {
    control,
    watch,
    setValue,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      brandName: '',
      instagram: '',
      tictok: '',
      snapchat: '',
      country: 'Nigeria',
      title: '',
      location: '',
      state: '',
      promotionTypes: [],
    },
    mode: 'all',
  });

  const form = watch();

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.PRIMARY}>
      <Header hasBackButton goBackText="Back" />
      <HeaderText
        hasHeaderText="Set up DJ profile"
        hasSubText="Fill profile type to customize your experience"
        width={wp(330)}
      />

      <AvoidingView>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: hp(120)}}>
          <Box mt={hp(40)} mx={wp(16)}>
            <Box mb={hp(16)}>
              <FormInput
                label="Enter brand name"
                autoCapitalize="none"
                control={control}
                name="brandName"
                value={form.brandName}
                errorText={errors.brandName?.message}
              />

              {!errors.brandName && (
                <Box
                  flexDirection={'row'}
                  alignItems={'center'}
                  bottom={hp(12)}>
                  <Icon name="info-icon" />
                  <Text
                    variant="body"
                    pl={wp(12)}
                    fontSize={fontSz(12)}
                    color={theme.colors.OFF_WHITE_100}>
                    This will be your app username. It must be verifiable and
                    copyright-free.
                  </Text>
                </Box>
              )}
            </Box>

            <FormInput
              label="Enter Instagram handle (ex @dj_zee)"
              control={control}
              name="instagram"
              value={form.instagram}
              errorText={errors.instagram?.message}
            />

            <Controller
              control={control}
              name="promotionTypes"
              render={({field: {onChange, value}}) => (
                <PromotionTypeSelector
                  value={value}
                  onChange={onChange}
                  onSelectAll={() => {}}
                />
              )}
            />

            <FormInput
              label="Select your country of residence"
              control={control}
              name="country"
              isDropDown
              editable={false}
              onPressDropDown={() => setOpen('country')}
              value={form.country}
              errorText={errors.country?.message}
            />

            <FormInput
              label="Select state of residence"
              control={control}
              name="state"
              isDropDown
              editable={false}
              onPressDropDown={() => setOpen('state')}
              value={form.state}
              errorText={errors.state?.message}
            />

            <FormInput
              label="Enter your play spot (e.g., Wbar Lounge)."
              control={control}
              name="title"
              value={form.title}
            />

            <FormInput
              label="Enter play spot address"
              control={control}
              name="location"
              value={form.location}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              containerStyle={{
                height: hp(100),
                marginTop: hp(10),
              }}
              inputTextStyle={{
                height: hp(100),
              }}
            />

            <Box flexDirection={'row'} alignItems={'center'} bottom={hp(12)}>
              <Icon name="info-icon" />
              <Text
                variant="body"
                fontSize={fontSz(12)}
                pl={wp(12)}
                color={theme.colors.OFF_WHITE_100}>
                Address must be verifiable for promotion approval. You can add
                more spots later or leave blank if none.
              </Text>
            </Box>
          </Box>
        </ScrollView>
      </AvoidingView>

      <Button
        title="Done"
        onPress={() => {}}
        bg={theme.colors.PRIMARY_100}
        disabled={
          form.brandName && form.instagram && form.title && form.location
            ? false
            : true
        }
        hasBorder
      />

      <SelectState
        isVisible={open === 'state'}
        onClose={() => setOpen('')}
        onSelectState={(state: any) => {
          setOpen('');
          setValue('state', state.state);
        }}
      />
    </Screen>
  );
};
