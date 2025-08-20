import React from 'react';
import {Box, Button, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils/responsive-design';
import Modal from 'react-native-modal';
import theme from 'theme';
import {Icon} from 'shared';

interface UpdateUserAccountProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const UpdateUserAccount = ({
  isVisible,
  onClose,
  onComplete,
}: UpdateUserAccountProps) => {
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
        bg={theme.colors.ACCENT_04}
        borderRadius={hp(30)}>
        <Box pt={hp(70)} justifyContent={'center'} alignItems={'center'}>
          <Icon name="success-icon" />
          <Text
            pt={20}
            variant="bodyMedium"
            fontSize={fontSz(20)}
            color={theme.colors.BLACK_DEFAULT}>
            Update User Account
          </Text>
          <Text
            pt={hp(16)}
            textAlign={'center'}
            color={theme.colors.BLACK_DEFAULT}>
            Please complete account update to continue.
          </Text>
        </Box>

        <Button
          title="Update Account"
          hasBorder
          hasIcon
          width={wp(320)}
          onPress={onComplete}
        />
      </Box>
    </Modal>
  );
};
