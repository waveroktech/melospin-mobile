import React from 'react';
import {Box, Text} from 'design-system';
import theme from 'theme';
import {styles} from './style';
import {Image, TouchableOpacity} from 'react-native';
import {fontSz, wp} from 'utils';
import {Icon} from 'shared';

interface PromotionItemProps {
  promotion: any;
  onPress?: () => void;
}

export const PromotionItem = ({promotion, onPress}: PromotionItemProps) => {
  const statusBg =
    promotion?.status === 'Pending approval'
      ? theme.colors.LIGHT_YELLOW
      : theme.colors.SEMANTIC_GREEN;

  const statusColor =
    promotion?.status === 'Pending approval'
      ? theme.colors.SEMANTIC_YELLOW
      : theme.colors.DARKER_GREEN;

  const promotionName = promotion?.promotionLink?.split('/');

  console.log(promotion);
  return (
    <Box
      style={styles.promotionContainer}
      onPress={onPress}
      as={TouchableOpacity}
      activeOpacity={0.8}>
      <Image source={theme.images.upload} style={styles.promotionImage} />
      <Box ml={10}>
        <Box flexDirection={'row'} alignItems={'center'}>
          <Text
            variant="bodyMedium"
            fontSize={fontSz(14)}
            numberOfLines={1}
            maxWidth={wp(150)}
            color={theme.colors.WHITE}>
            {promotionName?.[promotionName?.length - 1] ?? promotion?.title}
          </Text>
          <Box ml={10} bg={statusBg} p={1} borderRadius={24}>
            <Text style={{fontSize: fontSz(10)}} color={statusColor}>
              {promotion?.status === 'Pending approval'
                ? 'Pending approval'
                : 'Active'}
            </Text>
          </Box>
        </Box>
        {/* <Box flexDirection={'row'} mt={2} alignItems={'center'}>
          <Image
            source={theme.images['artist-list']}
            style={styles.sharedList}
            resizeMode="contain"
          />
          <Text
            pl={10}
            variant="body"
            style={{fontSize: fontSz(10)}}
            color={theme.colors.OFF_WHITE_100}>
            {promotion?.sharedWith}
          </Text>
        </Box> */}
        <Box
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Box flexDirection={'row'} mt={2} alignItems={'center'}>
            <Box flexDirection={'row'} alignItems={'center'}>
              <Icon name="play-location" />
              <Text
                variant="body"
                style={{fontSize: fontSz(12), paddingLeft: wp(5)}}
                color={theme.colors.WHITE}>
                {promotion?.djCount || 5}
              </Text>
            </Box>
          </Box>

          <Box flexDirection={'row'} mt={2} alignItems={'center'}>
            <Icon name="calendar-icon-2" />
            <Text
              variant="body"
              style={{fontSize: fontSz(12), paddingLeft: wp(5)}}
              color={theme.colors.WHITE}>
              {promotion?.playlistName || '10-11-25'}
            </Text>
          </Box>

          <Box flexDirection={'row'} mt={2} alignItems={'center'}>
            <Icon name="timeline-icon" />
            <Text
              variant="body"
              style={{fontSize: fontSz(12), paddingLeft: wp(5)}}
              color={theme.colors.WHITE}>
              {promotion?.timeline || '1 month'}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
