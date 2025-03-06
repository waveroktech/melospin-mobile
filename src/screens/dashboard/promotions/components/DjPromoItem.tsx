import React from 'react';
import {Box, Text} from 'design-system';
import {GradientBorderView} from '@good-react-native/gradient-border';
import {Image, TouchableOpacity} from 'react-native';
import {styles} from './style';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';
import {Icon} from 'shared';

interface DjPromoItemProps {
  dj: any;
  removePromoter: (item: any) => void;
}

export const DjPromoItem = ({dj, removePromoter}: DjPromoItemProps) => {
  return (
    <Box
      mt={hp(20)}
      mx={wp(16)}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <Box
        bg={theme.colors.TEXT_INPUT_BG}
        width={wp(279)}
        flexDirection={'row'}
        alignItems={'center'}
        p={hp(12)}
        borderRadius={hp(24)}>
        <GradientBorderView
          gradientProps={{
            colors: ['#FFFFFF', '#D73C3C', '#8932F7'],
          }}
          style={styles.gradientContainer}>
          <Image
            source={
              dj.profileUrl
                ? {uri: dj.profileUrl}
                : theme.images['dj-images']['dj-1']
            }
            style={styles.imageContainer}
          />
        </GradientBorderView>
        <Text
          pl={2}
          variant="body"
          fontSize={fontSz(14)}
          color={theme.colors.WHITE}>
          {dj.name}
        </Text>
      </Box>
      <Box
        as={TouchableOpacity}
        activeOpacity={0.8}
        bg={theme.colors.TEXT_INPUT_BG}
        p={hp(12)}
        onPress={() => removePromoter(dj)}
        borderRadius={hp(24)}>
        <Icon name="trash" />
      </Box>
    </Box>
  );
};
