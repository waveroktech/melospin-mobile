import React, {useCallback, useState} from 'react';
import {Box, Button, Text} from 'design-system';
import Modal from 'react-native-modal';
import {hp, wp} from 'utils';
import theme from 'theme';
import {Icon} from 'shared';
import {TouchableOpacity} from 'react-native';
import {
  DocumentPickerResponse,
  pick,
  types,
} from '@react-native-documents/picker';
import {useMelospinStore} from 'store';
import {showMessage} from 'react-native-flash-message';
import Config from 'react-native-config';

interface AddDiscographyProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const AddDiscography = ({
  isVisible,
  onClose,
  onComplete,
}: AddDiscographyProps) => {
  const [selectedFile, setSelectedFile] = useState<
    DocumentPickerResponse | undefined
  >(undefined);

  const {authToken} = useMelospinStore();

  const openMediaPicker = async () => {
    const files = await pick({
      allowMultiSelection: false,
      type: [types.audio],
      mode: 'open',
      presentationStyle: 'overFullScreen',
    });

    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = useCallback(() => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${authToken}`);

    const formdata = new FormData();
    formdata.append('media', {
      uri: selectedFile?.uri,
      name: selectedFile?.name,
      type: selectedFile?.type,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    //@ts-ignore
    fetch(`${Config.BASE_URL}/discographs`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result) {
          showMessage({
            message: `${selectedFile?.name} uploaded successfully`,
            type: 'success',
            duration: 2000,
          });
          onComplete();
        }
      })
      .catch(error => {
        console.error(error);
        showMessage({
          message: 'Failed to upload file',
          type: 'danger',
          duration: 2000,
        });
      });
  }, [authToken, selectedFile, onComplete]);

  console.log(selectedFile);
  return (
    <Box>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}>
        <Box
          bg={theme.colors.BLACK}
          borderWidth={0.5}
          width={wp(353)}
          p={hp(20)}
          alignSelf={'center'}
          borderRadius={hp(24)}
          height={hp(227)}
          borderColor={theme.colors.TEXT_INPUT_PLACEHOLDER}>
          <Box
            p={hp(20)}
            bg={theme.colors.OFF_BLACK_100}
            borderRadius={hp(24)}
            borderColor={theme.colors.OFF_BLACK_100}
            borderWidth={1}>
            {selectedFile?.name ? (
              <Box
                flexDirection={'row'}
                borderWidth={1}
                p={hp(20)}
                borderRadius={hp(16)}
                onPress={() => openMediaPicker()}
                as={TouchableOpacity}
                activeOpacity={0.8}
                justifyContent={'space-between'}
                borderColor={theme.colors.BASE_SECONDARY}
                alignItems={'center'}>
                <Box flexDirection={'row'} alignItems={'center'}>
                  <Icon name="add-song" />
                  <Text
                    pl={wp(16)}
                    width={wp(160)}
                    numberOfLines={1}
                    variant="body"
                    color={theme.colors.WHITE}>
                    {selectedFile?.name}
                  </Text>
                </Box>
                <Box
                  as={TouchableOpacity}
                  activeOpacity={0.8}
                  onPress={() => setSelectedFile(undefined)}>
                  <Icon name="trash-2" />
                </Box>
              </Box>
            ) : (
              <Box
                flexDirection={'row'}
                borderWidth={1}
                p={hp(20)}
                borderRadius={hp(16)}
                onPress={() => openMediaPicker()}
                as={TouchableOpacity}
                activeOpacity={0.8}
                borderColor={theme.colors.BASE_SECONDARY}
                alignItems={'center'}>
                <Icon name="add-song" />
                <Text pl={wp(16)} variant="body" color={theme.colors.WHITE}>
                  Click here to browse
                </Text>
              </Box>
            )}
          </Box>
          <Box
            flexDirection={'row'}
            alignItems={'center'}
            width={wp(112)}
            height={hp(40)}
            mt={hp(20)}
            borderWidth={1}
            justifyContent={'center'}
            borderRadius={hp(24)}
            as={TouchableOpacity}
            activeOpacity={0.8}
            onPress={handleUpload}
            alignSelf={'center'}
            borderColor={theme.colors.WHITE}>
            <Text variant="body" color={theme.colors.WHITE}>
              Upload
            </Text>
            <Icon name="upload-icon" />
          </Box>
        </Box>

        <Button
          isNotBottom
          position={'absolute'}
          top={hp(55)}
          hasBorder
          onPress={onClose}
          width={wp(160)}
          right={wp(0)}
          iconName="close-icon-2"
          title="Cancel Upload"
        />
      </Modal>
    </Box>
  );
};
