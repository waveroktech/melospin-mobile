import React from 'react';
import {Box, Text} from 'design-system';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';
import {Icon} from 'shared';
import {TouchableOpacity} from 'react-native';

export const FileUpload = () => {
  return (
    <Box
      bg={theme.colors.OFF_BLACK_100}
      mt={hp(20)}
      mx={wp(16)}
      p={hp(20)}
      borderRadius={hp(24)}
      borderWidth={1}
      borderColor={theme.colors.OFF_BLACK_100}>
      <Box
        borderWidth={1}
        p={hp(16)}
        as={TouchableOpacity}
        activeOpacity={0.8}
        flexDirection={'row'}
        alignItems={'center'}
        borderRadius={hp(16)}>
        <Icon name="file-upload" />
        <Text
          variant="body"
          pl={2}
          fontSize={fontSz(14)}
          color={theme.colors.WHITE}>
          Click here to browse and upload{' '}
        </Text>
      </Box>
    </Box>
  );
};
