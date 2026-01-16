import React from 'react';
import {Box, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'shared';
import {useMelospinStore} from 'store';

interface PlaySpotsProps {
  onAddNew: () => void;
}

export const PlaySpots = ({onAddNew}: PlaySpotsProps) => {
  const {userInfo} = useMelospinStore();
  return (
    <Box
      mt={hp(26)}
      p={hp(16)}
      pb={hp(24)}
      bg={theme.colors.OFF_WHITE_400}
      borderRadius={hp(12)}>
      <Box
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Text variant="bodyMedium" color={theme.colors.WHITE}>
          Play Spots
        </Text>
        <Box as={TouchableOpacity} activeOpacity={0.8} onPress={onAddNew}>
          <Text
            variant="bodyMedium"
            color={theme.colors.LIGHT_PRIMARY}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{textDecorationLine: 'underline'}}>
            Add New
          </Text>
        </Box>
      </Box>

      <Box mt={hp(16)}>
        <Box flexDirection={'row'} alignItems={'center'}>
          <Box
            width={wp(32)}
            height={wp(32)}
            bg={theme.colors.OFF_BLACK_300}
            borderRadius={hp(12)}
            justifyContent={'center'}
            alignItems={'center'}>
            <Icon name="spot-icon" />
          </Box>
          <Box ml={wp(12)}>
            <Text variant="bodyMedium" color={theme.colors.WHITE}>
              {userInfo?.playSpot}
            </Text>
            <Text
              variant="body"
              pt={hp(2)}
              fontSize={fontSz(12)}
              color={theme.colors.OFF_WHITE_100}>
              {userInfo?.playSpotAddress}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
