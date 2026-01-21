import React, {useState, useEffect} from 'react';
import {Box, Text} from 'design-system';
import {Header, Icon, Screen, Loader} from 'shared';
import {fontSz, hp, wp} from 'utils';
import {GradientBorderView} from '@good-react-native/gradient-border';
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import theme from 'theme';
import {styles} from './style';
import {AddNewPlaySpot, EditProfile, ManageKyc, ShareProfile} from './modals';
import {useMelospinStore} from 'store';
import {kycStatus} from 'data';
import {Genres, PlaySpots} from './components';
import {
  launchImageLibrary,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';
import {useUploadProfileImage, useGetProfileQrCode} from 'store/useUser';
import {showMessage} from 'react-native-flash-message';
import {useQueryClient} from '@tanstack/react-query';

export const DJProfile = () => {
  const [open, setOpen] = useState<
    'share-profile' | 'edit-profile' | 'manage-kyc' | 'add-new-play-spot' | ''
  >('');
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


  const {userInfo, setUserInfo, userData} = useMelospinStore();
  const queryClient = useQueryClient();

  // QR code query - only enabled when we want to fetch it
  const [shouldFetchQrCode, setShouldFetchQrCode] = useState(false);
  const {data: qrCodeData, isLoading: isLoadingQrCode, refetch: refetchQrCode} =
    useGetProfileQrCode(userData?.userId || null, shouldFetchQrCode);

  // Handle QR code fetch completion
  useEffect(() => {
    if (shouldFetchQrCode && !isLoadingQrCode && qrCodeData) {
      setOpen('share-profile');
    }
  }, [shouldFetchQrCode, isLoadingQrCode, qrCodeData]);

  // Handle share profile button press - fetch QR code first
  const handleShareProfile = () => {
    if (userData?.userId) {
      setShouldFetchQrCode(true);
      refetchQrCode().catch(() => {
        showMessage({
          message: 'Failed to load QR code',
          type: 'danger',
          duration: 2000,
        });
        setShouldFetchQrCode(false);
      });
    } else {
      showMessage({
        message: 'User ID not found',
        type: 'danger',
        duration: 2000,
      });
    }
  };

  // Get KYC status from userInfo
  // Check for status field (can be "uploaded" when document is uploaded but not reviewed)
  // Check for kyc field (final status: pending/approved/rejected)
  // Check for kycStatus field (legacy support)
  const getKycStatus = (): 'pending' | 'approved' | 'rejected' => {
    // If status is "uploaded", it means document is uploaded but pending review
    if ((userInfo as any)?.status === 'uploaded') {
      return 'pending';
    }
    // Check kyc field for final status
    if (userInfo?.kyc) {
      return userInfo.kyc as 'pending' | 'approved' | 'rejected';
    }
    // Check kycStatus field (legacy support)
    if (userInfo?.kycStatus) {
      return userInfo.kycStatus;
    }
    return 'pending';
  };

  const kycStatusKey = getKycStatus();
  const currentKycStatus = kycStatus[kycStatusKey] || kycStatus.pending;

  console.log(currentKycStatus, 'userInfo');

  // Upload profile image mutation
  const {mutate: uploadProfileImage, isPending: isUploading} =
    useUploadProfileImage({
      onSuccess: (data: any) => {
        if (data?.status === 'success' || data?.data) {
          showMessage({
            message: 'Profile image updated successfully',
            type: 'success',
            duration: 2000,
          });
          // Update user info with new profile URL if provided
          if (data?.data?.profileUrl) {
            setUserInfo({...userInfo, profileUrl: data.data.profileUrl});
          }
          // Invalidate user profile query to refetch updated data
          queryClient.invalidateQueries({queryKey: ['get-user-profile']});
          setSelectedImage(null);
        } else {
          showMessage({
            message: data?.message || 'Failed to upload profile image',
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

  // Upload cover image mutation
  const {mutate: uploadCoverImage, isPending: isUploadingCover} =
    useUploadProfileImage({
      onSuccess: (data: any) => {
        if (data?.status === 'success' || data?.data) {
          showMessage({
            message: 'Cover image updated successfully',
            type: 'success',
            duration: 2000,
          });
          // Update user info with new cover URL if provided
          if (data?.data?.coverUrl) {
            setUserInfo({...userInfo, coverUrl: data.data.coverUrl});
          }
          // Invalidate user profile query to refetch updated data
          queryClient.invalidateQueries({queryKey: ['get-user-profile']});
          setSelectedCoverImage(null);
        } else {
          showMessage({
            message: data?.message || 'Failed to upload cover image',
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

  // Open image picker for profile image
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
          // Automatically upload after selection
          if (userInfo?.userId) {
            uploadProfileImage({
              userId: userInfo.userId,
              file,
              imageType: 'profile',
            });
          }
        }
      },
    );
  };

  // Open image picker for cover image
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
          // Automatically upload after selection
          if (userInfo?.userId) {
            uploadCoverImage({
              userId: userInfo.userId,
              file,
              imageType: 'cover',
            });
          }
        }
      },
    );
  };

  console.log(userInfo, 'userInfo');

  return (
    <Screen removeSafeaArea>
      <Header hasBackText="Profile" />
      <Box flex={1}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: hp(120)}}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          scrollEventThrottle={16}
          bounces={true}
          removeClippedSubviews={false}>
        <Box mt={hp(20)} mx={wp(16)}>
          <Box>
            <GradientBorderView
              gradientProps={{
                colors: ['#FFFFFF', '#D73C3C', '#8932F7'],
              }}
              style={styles.gradientContainer}>
              <ImageBackground
                source={
                  selectedCoverImage?.uri || userInfo?.coverUrl
                    ? {uri: selectedCoverImage?.uri || userInfo?.coverUrl}
                    : theme.images.artist
                }
                imageStyle={styles.imageStyle}
                style={styles.imageContainer}>
                <Box
                  bg={theme.colors.OFF_BLACK_200}
                  width={wp(343)}
                  p={hp(20)}
                  borderRadius={hp(24)}
                  height={hp(145)}>
                  {isUploadingCover && (
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      justifyContent="center"
                      alignItems="center"
                      bg={theme.colors.OFF_BLACK_200}
                      borderRadius={hp(24)}>
                      <Loader loading={true} />
                    </Box>
                  )}
                  <Box
                    flexDirection={'row'}
                    as={TouchableOpacity}
                    alignSelf={'flex-end'}
                    activeOpacity={0.8}
                    alignItems={'center'}
                    onPress={openCoverImagePicker}
                    disabled={isUploadingCover}>
                    <Text
                      pr={wp(10)}
                      variant="body"
                      color={theme.colors.LIGHT_PRIMARY}>
                      Change Cover
                    </Text>
                    <Icon name="arrow-right-2" />
                  </Box>
                </Box>
              </ImageBackground>
            </GradientBorderView>
            <Box width={wp(100)}>
              <GradientBorderView
                gradientProps={{
                  colors: ['#FFFFFF', '#D73C3C', '#8932F7'],
                }}
                style={styles.profileImageContainer}>
                <Box>
                  <Image
                    source={
                      selectedImage?.uri || userInfo?.profileUrl
                        ? {uri: selectedImage?.uri || userInfo?.profileUrl }
                        : theme.images['dj-images']['dj-1']
                    }
                    style={styles.djProfileImage2}
                    resizeMode="cover"
                  />
                  {isUploading && (
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      justifyContent="center"
                      alignItems="center"
                      bg={theme.colors.OFF_BLACK_200}
                      borderRadius={hp(100)}>
                      <Loader loading={true} />
                    </Box>
                  )}
                </Box>
              </GradientBorderView>
              <Box
                width={wp(100)}
                as={TouchableOpacity}
                activeOpacity={0.8}
                position={'absolute'}
                bottom={-hp(30)}
                right={wp(-80)}
                zIndex={1000}
                onPress={openImagePicker}
                disabled={isUploading}>
                <Icon name="edit-icon" />
              </Box>
            </Box>
          </Box>

          <Box mt={hp(50)}>
            <Box flexDirection={'row'} alignItems={'center'}>
              <Text
                variant="bodyMedium"
                fontFamily={theme.font.AvenirNextSemiBold}
                fontSize={fontSz(16)}
                pr={2}
                color={theme.colors.WHITE}>
                {userInfo?.brandName}
              </Text>
              <Box top={0.5}>
                <Icon name="verified-icon" />
              </Box>
            </Box>
            <Text
              variant="body"
              fontSize={fontSz(14)}
              color={theme.colors.TEXT_INPUT_PLACEHOLDER}
              pt={hp(2)}>
              I’m a Multi- talented DJ with a vibe beyond the borders
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
                justifyContent={'center'}
                alignItems={'center'}
                borderRadius={24}
                bg={theme.colors.OFF_WHITE_500}>
                <Icon name="snapchat" />
              </Box>
            </Box>

            <Box mt={hp(20)} flexDirection={'row'} alignItems={'center'}>
              <Box
                width={wp(134)}
                height={hp(40)}
                borderWidth={1}
                flexDirection={'row'}
                alignItems={'center'}
                borderRadius={hp(24)}
                px={wp(2)}
                as={TouchableOpacity}
                activeOpacity={0.8}
                onPress={() => setOpen('edit-profile')}
                justifyContent={'space-evenly'}
                borderColor={theme.colors.WHITE}>
                <Icon name="edit-profile" />
                <Text variant="body" color={theme.colors.WHITE}>
                  Edit Profile
                </Text>
              </Box>

              <Box
                width={wp(134)}
                height={hp(40)}
                borderWidth={1}
                ml={wp(20)}
                flexDirection={'row'}
                alignItems={'center'}
                borderRadius={hp(24)}
                px={wp(2)}
                as={TouchableOpacity}
                activeOpacity={0.8}
                onPress={handleShareProfile}
                justifyContent={'space-evenly'}
                borderColor={theme.colors.WHITE}>
                <Icon name="share-profile" />
                <Text variant="body" color={theme.colors.WHITE}>
                  Share Profile
                </Text>
              </Box>
            </Box>
          </Box>

          <Box
            borderTopWidth={1}
            mt={hp(25)}
            borderTopColor={theme.colors.BASE_SECONDARY}>
            <Box
              as={TouchableOpacity}
              activeOpacity={0.8}
              onPress={() => setOpen('manage-kyc')}
              bg={theme.colors.OFF_BLACK_100}
              p={hp(16)}
              mt={hp(20)}
              borderRadius={hp(12)}>
              <Box flexDirection={'row'} alignItems={'center'}>
                <Icon name="verify-icon" />
                <Box flexDirection={'row'} alignItems={'center'} ml={wp(12)}>
                  <Text variant="bodyMedium" color={theme.colors.WHITE}>
                    Manage KYC
                  </Text>
                  <Box
                    bg={currentKycStatus.bgColor}
                    style={styles.kycStatusContainer}
                    borderRadius={hp(12)}>
                    <Text color={currentKycStatus.textColor}>
                      {currentKycStatus.title}
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Text
                variant="body"
                pt={hp(12)}
                fontSize={fontSz(12)}
                color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                {currentKycStatus.description}
              </Text>
            </Box>
            <PlaySpots
              onAddNew={() => {
                setOpen('add-new-play-spot');
              }}
            />

            <Genres genres={userInfo?.musicGenres || []} />
          </Box>
        </Box>
        </ScrollView>
      </Box>

      <ShareProfile
        isVisible={open === 'share-profile'}
        onClose={() => {
          setOpen('');
          setShouldFetchQrCode(false);
        }}
        qrCodeUrl={qrCodeData?.data?.qrCodeUrl || qrCodeData?.data?.qrCode || qrCodeData?.qrCodeUrl || qrCodeData?.qrCode}
        profileImageUrl={selectedImage?.uri || userInfo?.profileUrl}
        coverImageUrl={selectedCoverImage?.uri || userInfo?.coverUrl}
        isLoadingQrCode={isLoadingQrCode}
      />
      <EditProfile
        isVisible={open === 'edit-profile'}
        onClose={() => setOpen('')}
      />

      <ManageKyc
        isVisible={open === 'manage-kyc'}
        onClose={() => setOpen('')}
      />
      <AddNewPlaySpot
        isVisible={open === 'add-new-play-spot'}
        onClose={() => setOpen('')}
      />
    </Screen>
  );
};
