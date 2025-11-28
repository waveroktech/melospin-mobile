import React, {useState} from 'react';
import {Box, Text} from 'design-system';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {BottomToast, Icon} from 'shared';
import {useDeleteDiscography} from 'store';
import Clipboard from '@react-native-clipboard/clipboard';

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
    name: string;
    _id: string;
  };
  isPressable?: boolean;
  onPress?: () => void;
  isDisco?: boolean;
}
export const DiscographyItem = ({
  item,
  isPressable,
  onPress,
  isDisco,
}: DiscographyItemProps) => {
  console.log(item);
  const [showToast, setShowToast] = useState(false);
  const {mutate: deleteDiscography, isPending} = useDeleteDiscography({
    onSuccess: (data: any) => {
      console.log(data, 'data');
    },
  });

  const handleDelete = () => {
    deleteDiscography({discoId: [item?._id]});
  };

  if (item?.name) {
    return null;
  }

  const copyUrl = () => {
    Clipboard.setString(item?.url);
    setShowToast(true);
  };

  return (
    <Box
      bg={theme.colors.OFF_BLACK_100}
      mb={hp(16)}
      p={hp(20)}
      as={isPressable ? TouchableOpacity : View}
      onPress={onPress}
      flexDirection={'row'}
      activeOpacity={0.8}
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
            // eslint-disable-next-line react-native/no-inline-styles
            style={{textTransform: 'capitalize'}}
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
              ` feat ${item?.otherArtistes?.join(', ')}`}
          </Text>
        </Box>
      </Box>

      <Box
        activeOpacity={0.8}
        onPress={isDisco ? handleDelete : copyUrl}
        width={wp(37)}
        justifyContent={'center'}
        alignItems={'center'}
        height={hp(37)}
        as={TouchableOpacity}
        borderWidth={1}
        borderRadius={hp(100)}
        borderColor={theme.colors.OFF_WHITE_700}>
        <Icon name={isDisco ? 'arrow-right-5' : 'link-icon'} />
      </Box>

      <BottomToast
        visible={showToast}
        message="Copied to clipboard"
        type="success"
        onHide={() => setShowToast(false)}
      />
    </Box>
  );
};
