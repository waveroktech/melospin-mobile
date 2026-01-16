import React, {useState} from 'react';
import {Box, Text} from 'design-system';
import {Icon} from 'shared';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {TouchableOpacity, Alert} from 'react-native';
import {
  launchImageLibrary,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';
import {useUploadProofOfPlay} from 'store';
import {showMessage} from 'react-native-flash-message';

interface ProofOfPlayUploadProps {
  requestId: string | null;
  onUploadSuccess?: () => void;
}

export const ProofOfPlayUpload = ({
  requestId,
  onUploadSuccess,
}: ProofOfPlayUploadProps) => {
  const [selectedVideo, setSelectedVideo] = useState<{
    uri: string;
    type?: string;
    name?: string;
  } | null>(null);

  // Upload proof of play mutation
  const {mutate: uploadProofOfPlay, isPending: isUploading} =
    useUploadProofOfPlay({
      onSuccess: (data: any) => {
        console.log(data, 'data');
        if (data?.status === 'success') {
          showMessage({
            message: 'Proof of play uploaded successfully',
            type: 'success',
            duration: 2000,
          });
          setSelectedVideo(null);
          // Call callback to refetch promotion data
          onUploadSuccess?.();
        } else {
          showMessage({
            message: data?.message || 'Failed to upload proof of play',
            type: 'danger',
            duration: 2000,
          });
        }
      },
      onError: (error: any) => {
        console.log(error, 'error');
        showMessage({
          message: error?.message || 'Failed to upload proof of play',
          type: 'danger',
          duration: 2000,
        });
      },
    });

  // Open video picker
  const openVideoPicker = () => {
    launchImageLibrary(
      {
        mediaType: 'video' as MediaType,
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
            type: asset.type || 'video/mp4',
            name:
              asset.fileName ||
              asset.uri?.split('/').pop() ||
              'proof-of-play.mp4',
          };
          setSelectedVideo(file);
        }
      },
    );
  };

  // Handle upload proof of play
  const handleUploadProofOfPlay = () => {
    if (!selectedVideo || !requestId) {
      showMessage({
        message: 'Please select a video file',
        type: 'danger',
        duration: 2000,
      });
      return;
    }

    uploadProofOfPlay({
      requestId,
      file: selectedVideo,
    });
  };

  if (selectedVideo) {
    return (
      <Box
        mt={hp(30)}
        mx={wp(16)}
        borderWidth={1}
        borderColor={theme.colors.BASE_SECONDARY}
        borderRadius={hp(24)}
        p={hp(16)}>
        <Box
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          mb={hp(12)}>
          <Box flexDirection={'row'} alignItems={'center'} flex={1}>
            <Box
              width={wp(56)}
              height={hp(56)}
              borderRadius={hp(12)}
              bg={theme.colors.OFF_BLACK_300}
              alignItems={'center'}
              justifyContent={'center'}>
              <Icon name="video-icon" />
            </Box>
            <Box ml={wp(12)} flex={1}>
              <Text
                variant="bodyMedium"
                color={theme.colors.WHITE}
                numberOfLines={1}
                ellipsizeMode="tail">
                {selectedVideo.name || 'Selected video'}
              </Text>
            </Box>
          </Box>
          <Box
            as={TouchableOpacity}
            activeOpacity={0.8}
            onPress={() => setSelectedVideo(null)}
            ml={wp(12)}>
            <Icon name="close-icon" />
          </Box>
        </Box>
        <Box
          as={TouchableOpacity}
          activeOpacity={0.8}
          onPress={handleUploadProofOfPlay}
          disabled={isUploading}
          bg={theme.colors.LIGHT_PRIMARY}
          borderRadius={hp(12)}
          p={hp(12)}
          alignItems={'center'}
          justifyContent={'center'}>
          <Text variant="bodyMedium" color={theme.colors.WHITE}>
            {isUploading ? 'Uploading...' : 'Upload Proof of Play'}
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      mt={hp(30)}
      mx={wp(16)}
      borderWidth={1}
      borderColor={theme.colors.BASE_SECONDARY}
      borderRadius={hp(24)}
      flexDirection={'row'}
      as={TouchableOpacity}
      activeOpacity={0.8}
      onPress={openVideoPicker}
      alignItems={'center'}
      p={hp(16)}>
      <Box
        width={wp(56)}
        height={hp(56)}
        borderRadius={hp(12)}
        bg={theme.colors.OFF_BLACK_300}
        alignItems={'center'}
        justifyContent={'center'}>
        <Icon name="video-icon" />
      </Box>

      <Text
        variant="body"
        color={theme.colors.WHITE}
        ml={wp(12)}
        fontSize={fontSz(12)}>
        Click here to Upload Proof of Play
      </Text>
    </Box>
  );
};
