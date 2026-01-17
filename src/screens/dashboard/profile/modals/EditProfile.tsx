import React, {useCallback, useEffect, useState} from 'react';
import {Box, Button, FormInput} from 'design-system';
import {AvoidingView, BaseModal, Loader, ModalHeader} from 'shared';
import {hp} from 'utils';
import {ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useGetUserProfile, useMelospinStore, useUserProfileUpdate} from 'store';
import {showMessage} from 'react-native-flash-message';
import {GenreSelector} from '../components';

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
  const {userData} = useMelospinStore();

  const {refetch: refetchUserProfile} = useGetUserProfile({
    userId: userData?.userId,
  });
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    if (userData?.musicGenres) {
      setSelectedGenres(userData?.musicGenres);
    }
  }, [userData?.musicGenres]);

  const {control, watch} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      brandName: userData?.brandName || '',
      tiktok: userData?.tictok || '',
      snapchat: userData?.snapchat || '',
      instagram: userData?.instagram || '',
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
      userType: userData?.currentUserType || '',
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
          <ScrollView contentContainerStyle={{paddingBottom: hp(120)}} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <Box mt={hp(40)} mx={16}>
              <FormInput
                label="Brand name"
                control={control}
                name="brandName"
                value={form.brandName}
              />

              <FormInput
                label="Brand name"
                control={control}
                name="brandName"
                value={form.brandName}
              />

              <GenreSelector
                selectedGenres={selectedGenres}
                onGenreSelect={selectGenre}
              />

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
