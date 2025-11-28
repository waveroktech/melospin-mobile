import React from 'react';
import {Box, Button, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import Modal from 'react-native-modal';
import {Icon} from 'shared';

interface DeleteDiscographyProps {
  isVisible: boolean;
  onClose: () => void;
  handleDelete: () => void;
}

export const DeleteDiscography = ({
  isVisible,
  onClose,
  handleDelete,
}: DeleteDiscographyProps) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <Box
        width={wp(352)}
        alignSelf={'center'}
        height={hp(362)}
        p={20}
        py={hp(60)}
        alignItems={'center'}
        bg={theme.colors.ACCENT_04}
        borderRadius={hp(30)}>
        <Icon name="erase-icon" />
        <Text
          variant="bodyBold"
          pt={hp(20)}
          fontSize={fontSz(24)}
          textAlign={'center'}>
          Delete File?
        </Text>
        <Text
          pt={hp(20)}
          color={theme.colors.BLACK_DEFAULT}
          textAlign={'center'}>
          This action cannot be undone. Tap Yes to confirm if you wish to
          continue.
        </Text>

        <Box
          flexDirection={'row'}
          mt={hp(20)}
          alignItems={'center'}
          width={wp(320)}
          justifyContent={'space-between'}>
          <Button
            hasIcon
            isNotBottom
            width={wp(150)}
            hasBorder
            title="Back"
            onPress={onClose}
          />
          <Button
            hasIcon
            isNotBottom
            width={wp(150)}
            hasBorder
            backgroundColor={theme.colors.RED}
            title="Yes, Delete"
            onPress={handleDelete}
          />
        </Box>
      </Box>
    </Modal>
  );
};
