import React from 'react';
import {Box, Text} from 'design-system';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {Icon} from 'shared';

interface DiscographyItemProps {
  item: {
    createdAt: string;
    fileType: string;
    otherArtistes: any[];
    primaryArtiste: string;
    title: string;
    updatedAt: string;
    url: string;
    userId: string;
  };
  isPressable?: boolean;
  onPress?: () => void;
}
export const DiscographyItem = ({
  item,
  isPressable,
  onPress,
}: DiscographyItemProps) => {
  console.log(item, 'item');
  return (
    <Box
      bg={theme.colors.OFF_BLACK_100}
      mb={hp(16)}
      p={hp(20)}
      as={isPressable ? TouchableOpacity : View}
      onPress={onPress}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderRadius={hp(24)}
      mx={wp(16)}>
      <Box flexDirection={'row'} alignItems={'center'}>
        <ImageBackground
          source={theme.images.upload}
          style={styles.uploadCover}
          imageStyle={styles.uploadCoverStyle}
          resizeMode="cover">
          <Icon name="song-icon" />
        </ImageBackground>
        <Box ml={wp(12)}>
          <Text
            numberOfLines={1}
            width={wp(200)}
            variant="bodyMedium"
            fontFamily={theme.font.AvenirNextMedium}
            fontSize={fontSz(14)}
            color={theme.colors.WHITE}>
            {item?.title}
          </Text>
          <Text
            numberOfLines={1}
            pt={hp(2)}
            width={wp(200)}
            variant="body"
            color={theme.colors.OFF_WHITE_100}>
            {item?.primaryArtiste}
            {item?.otherArtistes?.length > 0 &&
              `,feat ${item?.otherArtistes?.join(', ')}`}
          </Text>
        </Box>
      </Box>

      <Box>
        <Icon name="like-song" />
      </Box>
    </Box>
  );
};
