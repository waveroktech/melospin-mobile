import React from 'react';
import {Box, Text} from 'design-system';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';
import {Icon} from 'shared';
import {TouchableOpacity, Alert, StyleProp, ViewStyle} from 'react-native';
import {pick, types} from '@react-native-documents/picker';
import {
  launchImageLibrary,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';

interface FileUploadProps {
  onSelectFile?: (file: any) => void;
  selectedFile: any | undefined;
  clearSelectedFile: () => void;
  onPress?: () => void;
  type?: 'audio' | 'image' | 'video';
  extraStyles?: StyleProp<ViewStyle>;
  text?: string;
}

export const FileUpload = ({
  onSelectFile,
  selectedFile,
  clearSelectedFile,
  onPress,
  type,
  extraStyles,
  text,
}: FileUploadProps) => {
  const openMediaPicker = async () => {
    if (type === 'image') {
      // Use image picker for images
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
            // Format the response to match the expected file structure
            const file = {
              uri: asset.uri,
              type: asset.type,
              name:
                asset.fileName || asset.uri?.split('/').pop() || 'image.jpg',
              size: asset.fileSize,
              title: asset.fileName || 'Selected Image',
            };
            onSelectFile?.(file);
          }
        },
      );
    } else {
      // Use document picker for audio and video
      const pickerType = type === 'audio' ? types.audio : types.video;
      const files = await pick({
        allowMultiSelection: false,
        type: [pickerType],
        mode: 'open',
        presentationStyle: 'overFullScreen',
      });

      if (files && files.length > 0) {
        onSelectFile?.(files[0]);
      }
    }
  };
  return (
    <Box
      bg={theme.colors.OFF_BLACK_100}
      mt={hp(20)}
      mx={type === 'image' ? wp(0) : wp(16)}
      p={hp(20)}
      borderRadius={hp(24)}
      borderWidth={1}
      borderColor={theme.colors.OFF_BLACK_100}
      style={extraStyles}>
      {selectedFile?.title ? (
        <Box
          flexDirection={'row'}
          borderWidth={1}
          p={hp(16)}
          borderRadius={hp(16)}
          onPress={() => openMediaPicker()}
          as={TouchableOpacity}
          activeOpacity={0.8}
          justifyContent={'space-between'}
          borderColor={theme.colors.BASE_SECONDARY}
          alignItems={'center'}>
          <Box flexDirection={'row'} alignItems={'center'}>
            <Icon name={type === 'image' ? 'upload-id' : 'file-upload'} />
            <Box>
              <Text
                pl={wp(16)}
                width={wp(160)}
                numberOfLines={1}
                variant="body"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{textTransform: 'capitalize'}}
                color={theme.colors.WHITE}>
                {selectedFile?.title}
              </Text>
              <Text
                pl={wp(16)}
                pt={hp(2)}
                width={wp(160)}
                numberOfLines={1}
                variant="body"
                color={theme.colors.WHITE}>
                {selectedFile?.primaryArtiste}
                {selectedFile?.otherArtistes?.length > 0 &&
                  ` feat ${selectedFile?.otherArtistes?.join(', ')}`}
              </Text>
            </Box>
          </Box>
          <Box
            as={TouchableOpacity}
            activeOpacity={0.8}
            onPress={clearSelectedFile}>
            <Icon name="trash-2" />
          </Box>
        </Box>
      ) : (
        <Box
          borderWidth={1}
          p={hp(16)}
          as={TouchableOpacity}
          onPress={onPress || openMediaPicker}
          activeOpacity={0.8}
          flexDirection={'row'}
          alignItems={'center'}
          borderRadius={hp(16)}
          style={extraStyles}>
          <Icon name={type === 'image' ? 'upload-id' : 'file-upload'} />
          <Text
            variant="body"
            pl={wp(10)}
            fontSize={fontSz(13)}
            color={theme.colors.WHITE}>
            {text || 'Click here to browse and upload'}
          </Text>
        </Box>
      )}
    </Box>
  );
};
