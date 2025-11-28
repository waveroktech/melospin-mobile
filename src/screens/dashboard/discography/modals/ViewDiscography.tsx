import React, {useState} from 'react';
import {Box, Button, Text} from 'design-system';
import {hp, wp} from 'utils';
import theme from 'theme';
import {BaseModal, Icon, ModalHeader, BottomToast} from 'shared';
import {TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {DeleteDiscography} from './DeleteDiscography';
import {showMessage} from 'react-native-flash-message';

interface ViewDiscographyProps {
  isVisible: boolean;
  onClose: () => void;
  discography: any;
}

export const ViewDiscography = ({
  isVisible,
  onClose,
  discography,
}: ViewDiscographyProps) => {
  const [showToast, setShowToast] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCopy = () => {
    Clipboard.setString(discography?.url);
    setShowToast(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const completeDelete = () => {
    setShowDeleteModal(false);
    onClose();
    showMessage({
      message: 'File deleted successfully',
      type: 'success',
    });
  };

  return (
    <BaseModal
      visible={isVisible}
      onClose={onClose}
      dialogContainerStyle={{
        backgroundColor: theme.colors.BASE_PRIMARY,
        borderTopWidth: hp(0),
      }}>
      <Box py={hp(20)}>
        <ModalHeader
          hasBackIcon
          iconName="back-icon"
          onClose={onClose}
          modalHeaderText="File Details"
        />
        <Box mt={hp(20)} mx={wp(16)}>
          <Text variant="body" color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
            View and manage file details
          </Text>

          <Box
            mt={hp(20)}
            bg={theme.colors.BASE_SECONDARY}
            p={hp(16)}
            borderRadius={hp(24)}>
            <Box
              flexDirection={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              borderBottomWidth={1}
              mb={hp(12)}
              borderBottomColor={theme.colors.BASE_SECONDARY}
              pb={hp(12)}>
              <Text
                variant="bodyMedium"
                color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                File name
              </Text>
              <Text variant="bodyMedium" color={theme.colors.WHITE}>
                {discography?.title}
              </Text>
            </Box>
            <Box
              flexDirection={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              borderBottomWidth={1}
              mb={hp(12)}
              borderBottomColor={theme.colors.BASE_SECONDARY}
              pb={hp(12)}>
              <Text
                variant="bodyMedium"
                color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                Primary artiste
              </Text>
              <Text variant="bodyMedium" color={theme.colors.WHITE}>
                {discography?.primaryArtiste}
              </Text>
            </Box>
            {discography?.otherArtistes?.length > 0 && (
              <Box
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                borderBottomColor={theme.colors.BASE_SECONDARY}
                pb={hp(2)}>
                <Text
                  variant="bodyMedium"
                  color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                  Other collaborators
                </Text>
                <Text
                  variant="bodyMedium"
                  maxWidth={wp(200)}
                  color={theme.colors.WHITE}>
                  {discography?.otherArtistes?.join(', ')}
                </Text>
              </Box>
            )}
          </Box>
          <Box mt={hp(20)}>
            <Text variant="bodyMedium" color={theme.colors.WHITE}>
              File Access Link
            </Text>

            <Box
              mt={hp(12)}
              flexDirection={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <Box
                bg={theme.colors.TEXT_INPUT_BG}
                p={hp(12)}
                width={'80%'}
                borderRadius={hp(24)}>
                <Text
                  numberOfLines={1}
                  variant="bodyMedium"
                  color={theme.colors.WHITE}
                  width={wp(200)}>
                  {discography?.url}
                </Text>
              </Box>

              <Box
                as={TouchableOpacity}
                activeOpacity={0.8}
                width={wp(37)}
                height={hp(37)}
                justifyContent={'center'}
                alignItems={'center'}
                borderRadius={hp(100)}
                borderWidth={1}
                borderColor={theme.colors.OFF_WHITE_700}
                onPress={handleCopy}>
                <Icon name="copy-icon" />
              </Box>
            </Box>
          </Box>

          <Box
            mt={hp(24)}
            mb={hp(20)}
            flexDirection={'row'}
            justifyContent={'space-between'}>
            <Button
              title="Delete"
              isNotBottom
              hasBorder
              width={wp(160)}
              backgroundColor={theme.colors.RED}
              onPress={handleDelete}
              hasIcon
            />
            <Button
              title="Save & Close"
              isNotBottom
              width={wp(160)}
              hasIcon
              hasBorder
            />
          </Box>
        </Box>
      </Box>
      <BottomToast
        visible={showToast}
        message="Copied to clipboard"
        type="success"
        onHide={() => setShowToast(false)}
      />

      <DeleteDiscography
        isVisible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        handleDelete={completeDelete}
      />
    </BaseModal>
  );
};
