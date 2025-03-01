import React from 'react';
import {Box, Text} from 'design-system';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './style';
import {Image} from 'react-native';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';
import {Icon} from 'shared';
import {GradientBorderView} from '@good-react-native/gradient-border';

export const ExploreHeaderContainer = () => {
  return (
    <Box
      overflow={'hidden'}
      mt={hp(20)}
      borderBottomWidth={0.6}
      mx={wp(16)}
      borderBottomColor={theme.colors.BASE_SECONDARY}
      pb={hp(24)}>
      <Image
        source={theme.images.headphones}
        style={styles.headphones}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['#00000000', '#000000']}
        style={styles.boxContainer}>
        <Box p={hp(20)}>
          <GradientBorderView
            gradientProps={{
              colors: ['#FFFFFF', '#D73C3C', '#8932F7'],
            }}
            style={styles.gradientContainer}>
            <Box flexDirection={'row'} mx={2} alignItems={'center'}>
              <Icon name="star" />
              <Text
                variant="bodyMedium"
                pl={2}
                style={{fontSize: fontSz(10)}}
                color={theme.colors.WHITE}>
                Now Trending DJs
              </Text>
            </Box>
          </GradientBorderView>

          <Text
            pt={hp(14)}
            variant="bodyBold"
            color={theme.colors.WHITE}
            fontSize={fontSz(24)}>
            DJ Zenzee
          </Text>
          <Text pt={hp(10)} variant="body" color={theme.colors.WHITE}>
            100K Plays
          </Text>
        </Box>
      </LinearGradient>
    </Box>
  );
};
