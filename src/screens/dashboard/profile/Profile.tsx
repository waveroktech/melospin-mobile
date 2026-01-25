import React, {useCallback, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Header, Icon, Loader, Screen} from 'shared';
import theme from 'theme';
import {styles} from './style';
import {Box, Text} from 'design-system';
import {deviceWidth, fontSz, formatNumber, hp, wp} from 'utils';
import {EmptyPromotionContainer} from '../promotions/components';
import {EditProfile} from './modals';
import {useGetDiscography, useMelospinStore} from 'store';
import {DiscographyItem} from '../discography/component';
import {useFocusEffect} from '@react-navigation/native';
import {
  launchImageLibrary,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';
import {useUploadProfileImage} from 'store/useUser';
import {showMessage} from 'react-native-flash-message';
import {useQueryClient} from '@tanstack/react-query';

export const Profile = () => {
  const [open, setOpen] = useState<'edit-profile' | ''>('');
  const [selectedImage, setSelectedImage] = useState<{
    uri: string;
    type?: string;
    name?: string;
  } | null>(null);
  const [selectedCoverImage, setSelectedCoverImage] = useState<{
    uri: string;
    type?: string;
    name?: string;
  } | null>(null);
  const {userData, setUserData, userInfo, setUserInfo} = useMelospinStore();
  const {data: discographyData, refetch, isPending} = useGetDiscography();
  const queryClient = useQueryClient();
  const socials = {
    instagram: (userData as any)?.instagram || '',
    tiktok: (userData as any)?.tictok || '',
    snapchat: (userData as any)?.snapchat || '',
  };
  const coverImageUrl =
    selectedCoverImage?.uri ||
    (userData as any)?.coverImageUrl ||
    (userData as any)?.coverUrl ||
    (userInfo as any)?.coverImageUrl ||
    (userInfo as any)?.coverUrl;

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const {mutate: uploadProfileImage, isPending: isUploading} =
    useUploadProfileImage({
      onSuccess: (response: any) => {
        if (response?.status === 'success' || response?.data) {
          showMessage({
            message: 'Profile image updated successfully',
            type: 'success',
            duration: 2000,
          });
          if (response?.data?.profileUrl) {
            if (userData) {
              setUserData({...userData, profileUrl: response.data.profileUrl});
            }
            if (userInfo) {
              setUserInfo({...userInfo, profileUrl: response.data.profileUrl});
            }
          }
          queryClient.invalidateQueries({queryKey: ['get-user-profile']});
          setSelectedImage(null);
        } else {
          showMessage({
            message: response?.message || 'Failed to upload profile image',
            type: 'danger',
            duration: 2000,
          });
        }
      },
      onError: (error: any) => {
        showMessage({
          message: error?.message || 'Failed to upload profile image',
          type: 'danger',
          duration: 2000,
        });
      },
    });

  const {mutate: uploadCoverImage, isPending: isUploadingCover} =
    useUploadProfileImage({
      onSuccess: (response: any) => {
        if (response?.status === 'success' || response?.data) {
          showMessage({
            message: 'Cover image updated successfully',
            type: 'success',
            duration: 2000,
          });
          if (response?.data?.coverImageUrl || response?.data?.coverUrl) {
            const coverUrl =
              response?.data?.coverImageUrl || response?.data?.coverUrl;
            if (userData) {
              setUserData({...userData, coverImageUrl: coverUrl} as any);
            }
            if (userInfo) {
              setUserInfo({...userInfo, coverImageUrl: coverUrl});
            }
          }
          queryClient.invalidateQueries({queryKey: ['get-user-profile']});
          setSelectedCoverImage(null);
        } else {
          showMessage({
            message: response?.message || 'Failed to upload cover image',
            type: 'danger',
            duration: 2000,
          });
        }
      },
      onError: (error: any) => {
        showMessage({
          message: error?.message || 'Failed to upload cover image',
          type: 'danger',
          duration: 2000,
        });
      },
    });

  const openImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo' as MediaType,
        quality: 1,
        selectionLimit: 1,
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          return;
        }
        if (response.errorMessage) {
          Alert.alert('Error', response.errorMessage);
          return;
        }
        if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          const file = {
            uri: asset.uri || '',
            type: asset.type || 'image/jpeg',
            name:
              asset.fileName ||
              asset.uri?.split('/').pop() ||
              'profile-image.jpg',
          };
          setSelectedImage(file);
          if (userData?.userId) {
            uploadProfileImage({
              userId: userData.userId,
              file,
              imageType: 'profile',
            });
          }
        }
      },
    );
  };

  const openCoverImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo' as MediaType,
        quality: 1,
        selectionLimit: 1,
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          return;
        }
        if (response.errorMessage) {
          Alert.alert('Error', response.errorMessage);
          return;
        }
        if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          const file = {
            uri: asset.uri || '',
            type: asset.type || 'image/jpeg',
            name:
              asset.fileName ||
              asset.uri?.split('/').pop() ||
              'cover-image.jpg',
          };
          setSelectedCoverImage(file);
          if (userData?.userId) {
            uploadCoverImage({
              userId: userData.userId,
              file,
              imageType: 'banner',
            });
          }
        }
      },
    );
  };

  const openSocialLink = async (platform: 'instagram' | 'tiktok' | 'snapchat') => {
    const handle = socials[platform];
    if (!handle) {
      return;
    }

    const normalizedHandle = handle.replace(/^@/, '').trim();
    const urlMap = {
      instagram: `https://instagram.com/${normalizedHandle}`,
      tiktok: `https://www.tiktok.com/@${normalizedHandle}`,
      snapchat: `https://www.snapchat.com/add/${normalizedHandle}`,
    };

    const url = urlMap[platform];
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    }
  };
  return (
    <Screen removeSafeaArea>
      <Header hasBackText="Profile" />
      <ScrollView>
        <ImageBackground
          source={
            coverImageUrl ? {uri: coverImageUrl} : theme.images['cover-image']
          }
          resizeMode="cover"
          style={styles.imageBg}>
          <Box
            bg={theme.colors.OFF_BLACK_200}
            width={deviceWidth}
            height={hp(309)}>
            {isUploadingCover && (
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                justifyContent="center"
                alignItems="center"
                bg={theme.colors.OFF_BLACK_200}>
                <Loader loading={true} />
              </Box>
            )}
            <Box
              flexDirection={'row'}
              as={TouchableOpacity}
              alignSelf={'flex-end'}
              activeOpacity={0.8}
              position={'absolute'}
              alignItems={'center'}
              mt={hp(12)}
              mr={wp(16)}
              onPress={openCoverImagePicker}
              disabled={isUploadingCover}>
              <Text pr={wp(10)} variant="body" color={theme.colors.LIGHT_PRIMARY}>
                Change Cover
              </Text>
              <Icon name="arrow-right-2" />
            </Box>
            <Box justifyContent={'center'} py={hp(80)} alignItems={'center'}>
              <TouchableOpacity activeOpacity={0.8} onPress={openImagePicker}>
                <Image
                  source={
                    selectedImage?.uri || userData?.profileUrl
                      ? {uri: selectedImage?.uri || userData?.profileUrl}
                      : theme.images['no-profile']
                  }
                  style={styles.profileImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Box flexDirection={'row'} alignItems={'center'}>
                <Text variant="bodyMedium" color={theme.colors.WHITE} pr={1}>
                  {userData?.firstName} {userData?.lastName}
                </Text>
                <Icon name="blue-tick" />
              </Box>
              <Text
                variant="body"
                fontSize={fontSz(12)}
                color={theme.colors.TEXT_INPUT_PLACEHOLDER}
                pt={1}>
                @{userData?.brandName}
              </Text>

              <Box
                bg={theme.colors.OFF_WHITE_400}
                mt={hp(10)}
                flexDirection={'row'}
                alignItems={'center'}
                style={{padding: hp(8)}}
                borderRadius={hp(24)}>
                <Image
                  source={theme.images['artist-list']}
                  style={styles.artistList}
                  resizeMode="contain"
                />
                <Text
                  variant="bodyMedium"
                  fontFamily={theme.font.AvenirNextSemiBold}
                  color={theme.colors.WHITE}
                  px={10}>
                  {formatNumber(userData?.totalConnections)} Connects
                </Text>

                <Icon name="song-uploads" />
                <Text
                  variant="bodyMedium"
                  fontFamily={theme.font.AvenirNextSemiBold}
                  color={theme.colors.WHITE}
                  pl={10}>
                  {formatNumber(userData?.recentUploads?.length)} Song Uploads
                </Text>
              </Box>

              <Box
                mt={hp(16)}
                width={wp(250)}
                justifyContent={'space-around'}
                flexDirection={'row'}
                alignItems={'center'}>
                <Box
                  width={wp(105)}
                  height={hp(40)}
                  borderWidth={1}
                  as={TouchableOpacity}
                  activeOpacity={0.8}
                  justifyContent={'center'}
                  alignItems={'center'}
                  borderRadius={hp(24)}
                  borderColor={theme.colors.WHITE}>
                  <Text variant="bodyMedium" color={theme.colors.WHITE}>
                    Share Profile
                  </Text>
                </Box>
                <Box
                  width={wp(105)}
                  height={hp(40)}
                  borderWidth={1}
                  as={TouchableOpacity}
                  activeOpacity={0.8}
                  onPress={() => setOpen('edit-profile')}
                  justifyContent={'center'}
                  alignItems={'center'}
                  borderRadius={hp(24)}
                  borderColor={theme.colors.WHITE}>
                  <Text variant="bodyMedium" color={theme.colors.WHITE}>
                    Edit Profile
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </ImageBackground>

        <Box
          mt={hp(20)}
          mx={wp(16)}
          borderBottomWidth={1}
          pb={20}
          borderBottomColor={theme.colors.BASE_SECONDARY}>
          <Text variant="body" color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
            Socials
          </Text>
          <Box
            mt={10}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Box
              width={wp(110)}
              height={hp(40)}
              as={TouchableOpacity}
              activeOpacity={0.8}
              onPress={() => openSocialLink('instagram')}
              justifyContent={'center'}
              alignItems={'center'}
              borderRadius={24}
              bg={theme.colors.OFF_WHITE_500}>
              <Icon name="instagram" />
            </Box>
            <Box
              width={wp(110)}
              height={hp(40)}
              as={TouchableOpacity}
              activeOpacity={0.8}
              onPress={() => openSocialLink('tiktok')}
              justifyContent={'center'}
              alignItems={'center'}
              borderRadius={24}
              bg={theme.colors.OFF_WHITE_500}>
              <Icon name="tiktok" />
            </Box>
            <Box
              width={wp(110)}
              height={hp(40)}
              as={TouchableOpacity}
              activeOpacity={0.8}
              onPress={() => openSocialLink('snapchat')}
              justifyContent={'center'}
              alignItems={'center'}
              borderRadius={24}
              bg={theme.colors.OFF_WHITE_500}>
              <Icon name="snapchat" />
            </Box>
          </Box>
        </Box>

        <Box mt={hp(20)}>
          <Text
            px={wp(16)}
            variant="bodyMedium"
            fontFamily={theme.font.AvenirNextSemiBold}
            color={theme.colors.WHITE}>
            Latest Releases
          </Text>

          {(discographyData?.data?.length ?? 0) === 0 ? (
            <EmptyPromotionContainer
              icon="empty-folder"
              containerStyles={{my: hp(40)}}
              title="No Releases Uploaded"
              subTitle="You can view all audio files as soon as they are uploaded your library"
            />
          ) : (
            <Box mt={hp(20)}>
              {discographyData?.data?.slice(0, 5)?.map((item: any) => (
                <DiscographyItem item={item} />
              ))}
            </Box>
          )}
        </Box>
      </ScrollView>

      <EditProfile
        isVisible={open === 'edit-profile'}
        onClose={() => setOpen('')}
      />

      <Loader loading={isUploading || isPending} />
    </Screen>
  );
};
