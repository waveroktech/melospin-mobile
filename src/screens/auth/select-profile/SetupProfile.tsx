import React, {useCallback, useState} from 'react';
import {Box, Button, FormInput} from 'design-system';
import {AvoidingView, Header, HeaderText, Loader, Screen} from 'shared';
import theme from 'theme';
import {hp, wp} from 'utils';
import {ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useMelospinStore, useSetAccountProfile} from 'store';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AuthStackParamList} from 'types';
import {showMessage} from 'react-native-flash-message';
import {SelectState} from './modals';
import {GenreSelector} from './components';

interface FormData {
  brandName: string;
  instagram: string;
  tictok: string;
  snapchat: string;
  country: string;
  state: string;
}

const schema = yup.object().shape({
  brandName: yup.string().required('Brand name is required'),
  instagram: yup.string().required('Instagram handle is required'),
  tictok: yup.string().required('TikTok handle is required'),
  snapchat: yup.string().required('Snapchat handle is required'),
});

export const SetupProfile = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [open, setOpen] = useState<'country' | 'state' | ''>('');

  const {setIsLoggedIn, setAuthToken, setUserData, setUserType} =
    useMelospinStore();
  const {accountType} =
    useRoute<RouteProp<AuthStackParamList, 'SetupProfile'>>()?.params;

  const {
    control,
    setValue,
    watch,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      brandName: '',
      instagram: '',
      tictok: '',
      snapchat: '',
      country: 'Nigeria',
      state: '',
    },
    mode: 'all',
  });

  const form = watch();

  const selectGenre = (selector: string) => {
    setSelectedGenres(prevState => {
      if (prevState.includes(selector)) {
        return prevState.filter(genre => genre !== selector);
      } else {
        return [...prevState, selector];
      }
    });
  };

  const {mutate: setAccountProfile, isPending} = useSetAccountProfile({
    onSuccess: (data: any) => {
      console.log('data', data);
      if (data?.status === 'success') {
        showMessage({
          message: 'Account profile created successfully',
          type: 'success',
          duration: 2000,
        });
        setAuthToken(data?.data?.token);
        setUserData(data?.data);
        setUserType(data?.data?.currentUserType);
        setIsLoggedIn(true);
      }
    },
  });

  const createAccountProfile = useCallback(() => {
    setAccountProfile({
      userType: accountType,
      brandName: form.brandName,
      instagram: form.instagram,
      tictok: form.tictok,
      musicGenres: selectedGenres,
      address: {
        country: form.country,
        state: form.state,
      },
    });
  }, [accountType, form, selectedGenres, setAccountProfile]);

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.PRIMARY}>
      <Header hasBackButton goBackText="Back" />
      <HeaderText
        hasHeaderText="Set up profile"
        hasSubText="Fill profile type to customize your experience"
        width={wp(330)}
      />

      <AvoidingView>
        <ScrollView
          contentContainerStyle={{paddingBottom: hp(120)}}
          showsVerticalScrollIndicator={false}>
          <Box mt={hp(40)} mx={wp(16)}>
            <FormInput
              label="Enter brand name"
              autoCapitalize="none"
              control={control}
              name="brandName"
              value={form.brandName}
              errorText={errors.brandName?.message}
            />
            <FormInput
              label="Enter Instagram handle (ex @dj_zee)"
              autoCapitalize="none"
              control={control}
              name="instagram"
              value={form.instagram}
              errorText={errors.instagram?.message}
            />
            <FormInput
              label="Enter TikTok handle (ex @dj_zee)"
              autoCapitalize="none"
              control={control}
              name="tictok"
              value={form.tictok}
              errorText={errors.tictok?.message}
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
            <GenreSelector
              selectedGenres={selectedGenres}
              onSelectGenre={selectGenre}
            />
          </Box>
        </ScrollView>
      </AvoidingView>

      <Button
        title="Done"
        onPress={createAccountProfile}
        bg={theme.colors.PRIMARY_100}
        disabled={
          form.brandName && form.instagram && selectedGenres?.length > 0
            ? false
            : true
        }
        hasBorder
      />

      <Loader loading={isPending} />

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
