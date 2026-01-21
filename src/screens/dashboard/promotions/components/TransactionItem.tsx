import React from 'react';
import {Box, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {Icon} from 'shared';
import {ImageBackground} from 'react-native';
import {styles} from './style';

interface TransactionItemProps {
  title?: string;
  status?: string;
  statusColor?: string;
  statusTextColor?: string;
  sharedWith?: string;
  amount?: string;
  date?: string;
}

export const TransactionItem = ({
  title = 'Erima.mp3',
  status = 'Paid',
  statusColor = theme.colors.SEMANTIC_GREEN,
  statusTextColor = theme.colors.DARKER_GREEN,
  sharedWith = 'Shared with DJ Zenzee & 25 Others',
  amount = '₦300,000',
  date = '12 Feb 2025',
}: TransactionItemProps) => {
  return (
    <Box
      mb={hp(20)}
      flexDirection={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}>
      <Box flexDirection={'row'} alignItems={'center'}>
        <ImageBackground
          source={theme.images.upload}
          imageStyle={styles.transactionImageStyle}
          style={styles.transactionImage}>
          <Icon name="song-uploads" />
        </ImageBackground>

        <Box ml={wp(10)}>
          <Box flexDirection={'row'} alignItems={'center'}>
            <Text variant="bodyMedium" color={theme.colors.WHITE}>
              {title}
            </Text>
            <Box
              bg={statusColor}
              ml={wp(2)}
              p={1}
              borderRadius={hp(12)}>
              <Text
                variant="bodyMedium"
                fontSize={fontSz(11)}
                color={statusTextColor}>
                {status}
              </Text>
            </Box>
          </Box>
          <Text
            variant="body"
            style={{fontSize: fontSz(10)}}
            pt={hp(2)}
            color={theme.colors.OFF_WHITE_100}>
            {sharedWith}
          </Text>
        </Box>
      </Box>
      <Box alignItems={'flex-end'}>
        <Text variant="body" fontSize={fontSz(13)} color={theme.colors.WHITE}>
          {amount}
        </Text>
        <Text
          variant="body"
          fontSize={fontSz(10)}
          color={theme.colors.OFF_WHITE_100}
          pt={hp(2)}>
          {date}
        </Text>
      </Box>
    </Box>
  );
};
