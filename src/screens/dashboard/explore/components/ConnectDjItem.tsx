import React from 'react';
import {Box, Text} from 'design-system';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';
import {GradientBorderView} from '@good-react-native/gradient-border';
import {styles} from './style';
import {Image, TouchableOpacity} from 'react-native';
import {Icon} from 'shared';

interface ConnectDjItemProps {
  item: any;
}

export const ConnectDjItem = ({item}: ConnectDjItemProps) => {
  return (
    <Box
      bg={theme.colors.OFF_BLACK_100}
      borderWidth={1}
      width={wp(163)}
      mr={wp(10)}
      mb={hp(16)}
      borderRadius={hp(24)}
      height={hp(178)}
      borderColor={theme.colors.BASE_SECONDARY}>
      <Box
        bg={theme.colors.OFF_BLACK_100}
        width={wp(163)}
        position={'absolute'}
        alignItems={'center'}
        justifyContent={'center'}
        bottom={0}
        borderRadius={hp(24)}
        height={hp(137)}>
        <Image source={item.profile} style={styles.profileImage} />

        <Box mb={hp(24)} flexDirection={'row'} alignItems={'center'}>
          <Text
            pr={2}
            variant="bodyMedium"
            fontSize={fontSz(14)}
            color={theme.colors.WHITE}>
            {item?.title}
          </Text>
          <Icon name="verified" />
        </Box>
        <GradientBorderView
          gradientProps={{
            colors: ['#FFFFFF', '#D73C3C', '#8932F7'],
          }}
          style={styles.buttonGradientContainer}>
          <Box as={TouchableOpacity} activeOpacity={0.8} flexDirection={'row'}>
            <Text variant="bodyMedium" color={theme.colors.WHITE}>
              Connect
            </Text>
          </Box>
        </GradientBorderView>
      </Box>
    </Box>
  );
};
