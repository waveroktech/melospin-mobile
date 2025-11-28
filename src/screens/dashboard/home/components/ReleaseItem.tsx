import React from 'react';
import {Box, Text} from 'design-system';
import {Image} from 'react-native';
import {styles} from './style';
import theme from 'theme';
import {fontSz} from 'utils';

interface ReleaseItemProps {
  release: any;
}
export const ReleaseItem = ({release}: ReleaseItemProps) => {
  return (
    <Box mr={20}>
      <Image
        source={release?.cover}
        style={styles.coverImage}
        resizeMode="contain"
      />
      <Text
        variant="body"
        fontFamily={theme.font.QuicksandRegular}
        fontSize={fontSz(13)}
        pt={1}
        color={theme.colors.WHITE}>
        {release?.title || ''}
      </Text>
      <Text
        pt={2}
        color={theme.colors.OFF_WHITE_100}
        fontFamily={theme.font.QuicksandRegular}>
        {release?.artist || ''}
      </Text>
    </Box>
  );
};
