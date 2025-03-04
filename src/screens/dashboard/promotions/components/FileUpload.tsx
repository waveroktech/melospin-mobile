import React from 'react';
import {Box, Text} from 'design-system';
import theme from 'theme';
import {fontSz, hp, removeUUID, wp} from 'utils';
import {Icon} from 'shared';
import {TouchableOpacity} from 'react-native';
import {
  DocumentPickerResponse,
  pick,
  types,
} from '@react-native-documents/picker';

interface FileUploadProps {
  onSelectFile?: (file: any) => void;
  selectedFile: DocumentPickerResponse | undefined;
  clearSelectedFile: () => void;
  onPress: () => void;
}

export const FileUpload = ({
  onSelectFile,
  selectedFile,
  clearSelectedFile,
  onPress,
}: FileUploadProps) => {
  const openMediaPicker = async () => {
    const files = await pick({
      allowMultiSelection: false,
      type: [types.audio],
      mode: 'open',
      presentationStyle: 'overFullScreen',
    });

    if (files && files.length > 0) {
      onSelectFile?.(files[0]);
    }
  };
  return (
    <Box
      bg={theme.colors.OFF_BLACK_100}
      mt={hp(20)}
      mx={wp(16)}
      p={hp(20)}
      borderRadius={hp(24)}
      borderWidth={1}
      borderColor={theme.colors.OFF_BLACK_100}>
      {selectedFile?.name ? (
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
            <Icon name="file-upload" />
            <Text
              pl={wp(16)}
              width={wp(160)}
              numberOfLines={1}
              variant="body"
              color={theme.colors.WHITE}>
              {removeUUID(selectedFile?.name)}
            </Text>
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
          onPress={onPress}
          activeOpacity={0.8}
          flexDirection={'row'}
          alignItems={'center'}
          borderRadius={hp(16)}>
          <Icon name="file-upload" />
          <Text
            variant="body"
            pl={wp(10)}
            fontSize={fontSz(13)}
            color={theme.colors.WHITE}>
            Click here to browse and upload
          </Text>
        </Box>
      )}
    </Box>
  );
};
