import React, {useCallback, useEffect, useState} from 'react';
import {Box, Button, FormInput, Text} from 'design-system';
import {AvoidingView, BaseModal, Loader, ModalHeader} from 'shared';
import {fontSz, hp, wp} from 'utils';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import theme from 'theme';
import {useGetGenre} from 'store/useGenre';
import {useGetUserProfile, useMelospinStore, useUserProfileUpdate} from 'store';
import {styles} from './style';
import {showMessage} from 'react-native-flash-message';

interface EditProfileProps {
  isVisible: boolean;
  onClose: () => void;
}

interface FormData {
  brandName: string;
  instagram: string;
  tiktok: string;
  snapchat: string;
}

const schema = yup.object().shape({
  brandName: yup.string().required(),
  instagram: yup.string().required(),
  snapchat: yup.string().required(),
  tiktok: yup.string().required(),
});

export const EditProfile = ({isVisible, onClose}: EditProfileProps) => {
  const {data: musicGenres, refetch} = useGetGenre();

  const {userData} = useMelospinStore();

  const {data: userProfile, refetch: refetchUserProfile} = useGetUserProfile({
    userId: userData?.userId,
  });
  console.log(userProfile);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    if (userData?.musicGenres) {
      setSelectedGenres(userData?.musicGenres);
    }
  }, [userData?.musicGenres]);

  const {control, watch} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      brandName: userData?.brandName,
      tiktok: userData?.tictok,
      snapchat: userData?.snapchat,
      instagram: userData?.instagram,
    },
    mode: 'all',
  });

  const form = watch();

  useEffect(() => {
    if (isVisible) {
      refetch();
    }
  }, [isVisible, refetch]);

  const selectGenre = async (selector: string) => {
    setSelectedGenres(prevState => {
      if (prevState.includes(selector)) {
        return prevState.filter(genre => genre !== selector);
      } else {
        return [...prevState, selector];
      }
    });
  };

  const {mutate: updateProfile, isPending} = useUserProfileUpdate({
    onSuccess: (data: any) => {
      if (data?.status === 'failed') {
        return showMessage({
          message: data?.message,
          type: 'danger',
          duration: 2000,
        });
      }
      if (data?.status === 'success') {
        showMessage({
          message: 'Profile updated successfully.',
          type: 'success',
          duration: 2000,
        });
        refetchUserProfile();
        // onClose();
      }
    },
  });

  const handleProfileUpdate = useCallback(() => {
    updateProfile({
      music_genres: selectedGenres,
      brandName: form.brandName,
      twitter: form.tiktok,
      instagram: form.instagram,
      user_id: userData?.userId,
      userType: userData?.currentUserType,
    });
  }, [
    form.brandName,
    form.instagram,
    form.tiktok,
    selectedGenres,
    updateProfile,
    userData?.currentUserType,
    userData?.userId,
  ]);
  return (
    <BaseModal visible={isVisible} onClose={onClose}>
      <Box py={hp(20)} height={'100%'}>
        <ModalHeader
          hasBackIcon
          onClose={onClose}
          modalHeaderText="Edit Profile"
        />

        <AvoidingView>
          <ScrollView>
            <Box mt={hp(40)} mx={16}>
              <FormInput
                label="Brand name"
                control={control}
                name="brandName"
                value={form.brandName}
              />

              <Box
                bg={theme.colors.TEXT_INPUT_BG}
                pt={hp(12)}
                px={wp(16)}
                mb={hp(20)}
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
                          <Image
                            source={
                              selectedGenres?.includes(genre.title)
                                ? theme.images.icons['active-tick']
                                : theme.images.icons['inactive-tick']
                            }
                            style={styles.icon}
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

              <FormInput
                label="Instagram handle"
                autoCapitalize="none"
                control={control}
                name="instagram"
                value={form.instagram}
              />
              <FormInput
                label="Tiktok handle"
                autoCapitalize="none"
                control={control}
                name="tiktok"
                value={form.tiktok}
              />
              <FormInput
                label="Snapchat handle"
                autoCapitalize="none"
                control={control}
                name="snapchat"
                value={form.snapchat}
              />
            </Box>
          </ScrollView>
        </AvoidingView>
      </Box>

      <Button
        title="Save"
        hasBorder
        onPress={handleProfileUpdate}
        iconName="arrow-right-3"
        disabled={form.brandName && selectedGenres?.length > 0 ? false : true}
      />

      <Loader loading={isPending} />
    </BaseModal>
  );
};
