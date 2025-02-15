import React from 'react';
import {Box, Text} from 'design-system';
import {GradientBorderView} from '@good-react-native/gradient-border';
import {styles} from './style';
import {fontSz, wp} from 'utils';
import theme from 'theme';
import {Image} from 'react-native';
import {Icon} from 'shared';

export const DashboardHeader = () => {
  return (
    <Box
      mx={wp(16)}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <Text
        variant="bodyMedium"
        fontSize={fontSz(20)}
        color={theme.colors.WHITE}>
        Home
      </Text>

      <Box
        flexDirection={'row'}
        alignItems={'center'}
        width={wp(80)}
        justifyContent={'space-between'}>
        <GradientBorderView
          gradientProps={{
            colors: ['#FFFFFF', '#D73C3C', '#8932F7'],
          }}
          style={styles.gradientContainer}>
          <Image source={theme.images.artist} style={styles.imageContainer} />
        </GradientBorderView>
        <Icon name="notification" />
      </Box>
    </Box>
  );
};
