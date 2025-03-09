import React from 'react';
import {Box, Text} from 'design-system';
import theme from 'theme';
import {styles} from './style';
import {Image} from 'react-native';
import {fontSz, removeUUID, wp} from 'utils';

interface PromotionItemProps {
  promotion: any;
}

export const PromotionItem = ({promotion}: PromotionItemProps) => {
  const statusBg =
    promotion?.status === 'pending'
      ? theme.colors.LIGHT_YELLOW
      : theme.colors.SEMANTIC_GREEN;

  const statusColor =
    promotion?.status === 'pending'
      ? theme.colors.SEMANTIC_YELLOW
      : theme.colors.DARKER_GREEN;

  const promotionName = promotion?.promotionLink?.split('/');
  return (
    <Box style={styles.promotionContainer}>
      <Image source={theme.images.upload} style={styles.promotionImage} />
      <Box ml={10}>
        <Box flexDirection={'row'} alignItems={'center'}>
          <Text
            variant="bodyMedium"
            fontSize={fontSz(14)}
            numberOfLines={1}
            width={wp(150)}
            color={theme.colors.WHITE}>
            {removeUUID(promotionName?.[promotionName?.length - 1])}
          </Text>
          <Box ml={10} bg={statusBg} p={1} borderRadius={24}>
            <Text style={{fontSize: fontSz(10)}} color={statusColor}>
              {promotion?.status === 'pending' ? 'Pending approval' : 'Active'}
            </Text>
          </Box>
        </Box>
        <Box flexDirection={'row'} mt={2} alignItems={'center'}>
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
        </Box>
      </Box>
    </Box>
  );
};
