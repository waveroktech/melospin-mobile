import React from 'react';
import {Box, Text} from 'design-system';
import theme from 'theme';
import {styles} from './style';
import {Image} from 'react-native';
import {fontSz} from 'utils';

interface PromotionItemProps {
  promotion: any;
}

export const PromotionItem = ({promotion}: PromotionItemProps) => {
  return (
    <Box style={styles.promotionContainer}>
      <Image source={theme.images.upload} style={styles.promotionImage} />
      <Box ml={10}>
        <Box flexDirection={'row'} alignItems={'center'}>
          <Text
            variant="bodyMedium"
            fontSize={fontSz(14)}
            color={theme.colors.WHITE}>
            {promotion?.title}
          </Text>
          <Box ml={10} bg={promotion?.bg} p={1} borderRadius={24}>
            <Text style={{fontSize: fontSz(10)}} color={promotion?.textColor}>
              {promotion?.status}
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
