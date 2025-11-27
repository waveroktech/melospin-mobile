import React from 'react';
import {Box, Text} from 'design-system';
import {Icon} from 'shared';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../style';

interface TrendingNowProps {
  onExplorePress?: () => void;
}

export const TrendingNow = ({onExplorePress}: TrendingNowProps) => {
  return (
    <Box mt={20}>
      <Box flexDirection={'row'} alignItems={'center'}>
        <Text
          variant="bodyMedium"
          fontFamily={theme.font.AvenirNextSemiBold}
          color={theme.colors.WHITE}>
          Trending Now
        </Text>
        <Box
          ml={10}
          flexDirection={'row'}
          alignItems={'center'}
          as={onExplorePress ? TouchableOpacity : undefined}
          onPress={onExplorePress}
          activeOpacity={onExplorePress ? 0.8 : 1}>
          <Text
            variant="bodyMedium"
            fontSize={fontSz(15)}
            color={theme.colors.LIGHT_PRIMARY}
            pr={2}>
            Explore
          </Text>
          <Icon name="arrow-right-2" />
        </Box>
      </Box>

      <Box
        position="relative"
        overflow="hidden"
        borderRadius={hp(24)}
        mt={hp(16)}>
        <Image
          source={theme.images['pick-of-the-week']}
          style={styles.trendingImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.56831)', '#000000']}
          locations={[0, 0.7274, 1]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.gradientOverlay}>
          <Box
            flexDirection={'column'}
            justifyContent={'space-between'}
            flex={1}
            paddingTop={hp(12)}
            paddingBottom={hp(12)}>
            <Box
              flexDirection={'row'}
              alignItems={'center'}
              paddingLeft={hp(16)}>
              <Image
                source={theme.images['dj-images']['dj-1']}
                style={styles.djProfile2}
              />
              <Text
                variant="bodyMedium"
                fontFamily={theme.font.AvenirNextSemiBold}
                color={theme.colors.WHITE}
                style={{paddingLeft: wp(10)}}>
                Pick of the week
              </Text>
            </Box>
            <Box
              flexDirection={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              paddingLeft={hp(16)}
              paddingRight={hp(16)}>
              <Text
                variant="bodyMedium"
                fontFamily={theme.font.AvenirNextSemiBold}
                color={theme.colors.WHITE}>
                Coming soon...
              </Text>

              <Text
                variant="body"
                fontFamily={theme.font.AvenirNextRegular}
                color={theme.colors.WHITE}>
                0.0K Plays
              </Text>
            </Box>
          </Box>
        </LinearGradient>
      </Box>
    </Box>
  );
};
