import React, {useCallback, useEffect, useState} from 'react';
import {Box, Button, FormInput, Text} from 'design-system';
import {AvoidingView, Header, HeaderText, Icon, Loader, Screen} from 'shared';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';
import {ScrollView, TouchableOpacity} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useMelospinStore, useSetAccountProfile} from 'store';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AuthStackParamList} from 'types';
import {useGetGenre} from 'store/useGenre';
import {showMessage} from 'react-native-flash-message';

interface FormData {
  brandName: string;
  instagram: string;
  tictok: string;
}

const schema = yup.object().shape({
  brandName: yup.string().required(),
  instagram: yup.string().required(),
  tictok: yup.string().required(),
});

export const SetupProfile = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const {setIsLoggedIn} = useMelospinStore();
  const {accountType} =
    useRoute<RouteProp<AuthStackParamList, 'SetupProfile'>>()?.params;

  const {data: musicGenres, refetch} = useGetGenre();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const {control, watch} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      brandName: '',
      instagram: '',
      tictok: '',
    },
    mode: 'all',
  });

  const form = watch();

  const selectGenre = async (selector: string) => {
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
      if (data?.status === 'success') {
        showMessage({
          message: 'Account profile created successfully',
          type: 'success',
          duration: 2000,
        });
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
        <ScrollView>
          <Box mt={hp(40)} mx={wp(16)}>
            <FormInput
              label="Enter brand name"
              autoCapitalize="none"
              control={control}
              name="brandName"
              value={form.brandName}
            />
            <FormInput
              label="Enter Instagram handle (ex @dj_zee)"
              autoCapitalize="none"
              control={control}
              name="instagram"
              value={form.instagram}
            />
            <FormInput
              label="Enter TikTok handle (ex @dj_zee)"
              autoCapitalize="none"
              control={control}
              name="tictok"
              value={form.tictok}
            />

            <Box
              bg={theme.colors.TEXT_INPUT_BG}
              pt={hp(12)}
              px={wp(16)}
              pb={hp(16)}
              borderRadius={hp(24)}>
              <Text variant="body" color={theme.colors.WHITE}>
                Select genre of music you specialize in
              </Text>
              <Box
                mt={hp(10)}
                flexDirection={'row'}
                alignItems={'center'}
                flexWrap={'wrap'}>
                {musicGenres?.data?.map(
                  (genre: {_id: string; title: string}) => {
                    return (
                      <Box
                        key={genre?._id}
                        flexDirection={'row'}
                        alignItems={'center'}
                        mr={2}
                        py={2}
                        onPress={() => selectGenre(genre?.title)}
                        as={TouchableOpacity}
                        activeOpacity={0.8}
                        px={2}
                        borderRadius={hp(24)}
                        mb={10}
                        bg={theme.colors.BASE_SECONDARY}>
                        <Icon
                          name={
                            selectedGenres?.includes(genre?.title)
                              ? 'active-checkbox'
                              : 'checkbox'
                          }
                        />
                        <Text
                          pl={2}
                          variant="body"
                          fontSize={fontSz(14)}
                          color={theme.colors.WHITE}>
                          {genre?.title}
                        </Text>
                      </Box>
                    );
                  },
                )}
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </AvoidingView>

      <Button
        title="Done"
        onPress={createAccountProfile}
        bg={theme.colors.PRIMARY_100}
        disabled={
          form.brandName &&
          form.instagram &&
          form.tictok &&
          selectedGenres?.length > 0
            ? false
            : true
        }
        hasBorder
      />

      <Loader loading={isPending} />
    </Screen>
  );
};
