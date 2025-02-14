import React from 'react';
import {Box, Text} from 'design-system';
import {hasDynamicIsland, hasNotch} from 'react-native-device-info';
import {fontSz, hp, wp} from 'utils';
import {Icon} from 'shared/Icon';

interface FlashMessageProps {
  message: string;
  icon: string;
  closeMessage: () => void;
  borderColor: string;
  messageTextColor?: string;
  bgColor: string;
}

export const FlashMessageItem = ({
  message,
  icon,
  borderColor,
  messageTextColor,
  bgColor,
}: FlashMessageProps) => {
  return (
    <Box
      backgroundColor={bgColor}
      borderWidth={1}
      borderColor={borderColor}
      mt={hasDynamicIsland() || hasNotch() ? hp(60) : hp(40)}
      mx={wp(16)}
      justifyContent={'center'}
      px={wp(16)}
      height={hp(88)}
      borderRadius={hp(24)}>
      <Box
        borderRadius={hp(8)}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Box flexDirection={'row'} alignItems={'center'}>
          <Icon name={icon} />
          <Box ml={10}>
            <Text
              variant="body"
              width={wp(270)}
              fontSize={fontSz(14)}
              color={messageTextColor}>
              {message}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
