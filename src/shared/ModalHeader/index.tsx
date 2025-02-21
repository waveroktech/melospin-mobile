import React from 'react';
import {Box, Text} from 'design-system';
import {Icon} from 'shared/Icon';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';
import {TouchableOpacity} from 'react-native';

interface ModalHeaderProps {
  hasBackIcon?: boolean;
  modalHeaderText?: string;
  onClose?: () => void;
}

export const ModalHeader = ({
  onClose,
  hasBackIcon,
  modalHeaderText,
}: ModalHeaderProps) => {
  if (hasBackIcon) {
    return (
      <Box
        mx={wp(16)}
        borderBottomWidth={1}
        pb={20}
        flexDirection={'row'}
        alignItems={'center'}
        borderBottomColor={theme.colors.BASE_SECONDARY}>
        <Box
          as={TouchableOpacity}
          activeOpacity={0.8}
          onPress={onClose}
          width={wp(56)}
          height={hp(40)}
          borderWidth={1}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius={hp(24)}
          borderColor={theme.colors.WHITE}>
          <Icon name="back-arrow" />
        </Box>
        <Text
          variant="bodyMedium"
          pl={wp(10)}
          fontFamily={theme.font.AvenirNextSemiBold}
          fontSize={fontSz(16)}
          color={theme.colors.WHITE}>
          {modalHeaderText}
        </Text>
      </Box>
    );
  } else {
    return (
      <Box
        mx={wp(16)}
        borderBottomWidth={1}
        pb={20}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        borderBottomColor={theme.colors.BASE_SECONDARY}>
        <Text
          variant="bodyMedium"
          fontFamily={theme.font.AvenirNextSemiBold}
          fontSize={fontSz(16)}
          color={theme.colors.WHITE}>
          {modalHeaderText}
        </Text>

        <Box as={TouchableOpacity} activeOpacity={0.9} onPress={onClose}>
          <Icon name="close-icon" />
        </Box>
      </Box>
    );
  }
};
