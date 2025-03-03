import React from 'react';
import {Box, Text} from 'design-system';
import theme from 'theme';
import {hp, removeUUID, wp} from 'utils';
import {ImageBackground} from 'react-native';
import {styles} from './style';
import {Icon} from 'shared';

interface DiscographyItemProps {
  item: {
    createdAt: string;
    fileType: string;
    name: string;
    updatedAt: string;
    url: string;
    userId: string;
    __v: number;
    _id: string;
  };
}
export const DiscographyItem = ({item}: DiscographyItemProps) => {
  return (
    <Box
      bg={theme.colors.OFF_BLACK_100}
      mb={hp(16)}
      p={hp(20)}
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

        <Text
          pl={wp(10)}
          numberOfLines={1}
          width={wp(200)}
          variant="body"
          color={theme.colors.WHITE}>
          {removeUUID(item?.name)}
        </Text>
      </Box>

      <Box>
        <Icon name="like-song" />
      </Box>
    </Box>
  );
};
