import React from 'react';
import {Box, Button, Text} from 'design-system';
import Modal from 'react-native-modal';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {Icon} from 'shared';

interface AddedDiscographyProps {
  isVisible: boolean;
  onClose: () => void;
}

export const AddedDiscography = ({
  isVisible,
  onClose,
}: AddedDiscographyProps) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <Box
        width={wp(352)}
        alignSelf={'center'}
        height={hp(362)}
        p={hp(16)}
        bg={theme.colors.ACCENT_04}
        borderRadius={hp(30)}>
        <Box pt={hp(70)} justifyContent={'center'} alignItems={'center'}>
          <Icon name="upload-done" />
          <Text
            pt={hp(16)}
            variant="bodyMedium"
            fontFamily={theme.font.AvenirNextSemiBold}
            fontSize={fontSz(24)}
            color={theme.colors.BLACK_DEFAULT}>
            Audio Upload Successful!
          </Text>
          <Text
            pt={hp(16)}
            width={wp(279)}
            textAlign={'center'}
            color={theme.colors.BLACK_DEFAULT}>
            You can view all audio files added your library
          </Text>
        </Box>

        <Button
          title="Done"
          hasBorder
          hasIcon
          width={wp(320)}
          onPress={onClose}
        />
      </Box>
    </Modal>
  );
};
