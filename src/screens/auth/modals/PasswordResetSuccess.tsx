import React from 'react';
import {Box, Button, Text} from 'design-system';
import Modal from 'react-native-modal';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {Icon} from 'shared';

interface PasswordResetSuccessProps {
  isVisible: boolean;
  onClose: () => void;
}

export const PasswordResetSuccess = ({
  isVisible,
  onClose,
}: PasswordResetSuccessProps) => {
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
            Password Reset Successful!
          </Text>
          <Text
            pt={hp(16)}
            textAlign={'center'}
            color={theme.colors.BLACK_DEFAULT}>
            You have successfully created new password for your account.
          </Text>
        </Box>

        <Button
          title="Continue to Login"
          hasBorder
          hasIcon
          width={wp(320)}
          onPress={onClose}
        />
      </Box>
    </Modal>
  );
};
