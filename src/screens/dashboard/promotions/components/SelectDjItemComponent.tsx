import React from 'react';
import {Box, Text} from 'design-system';
import {Icon} from 'shared';
import {capitalizeTitle, fontSz, formatNumberWithCommas, hp, wp} from 'utils';
import theme from 'theme';
import {Image, TouchableOpacity} from 'react-native';
import {styles} from './style';

interface SelectDjItemComponentProps {
  item: any;
  onPress: (item: any) => void;
  selectedDjs: any[];
}

export const SelectDjItemComponent = ({
  item,
  onPress,
  selectedDjs,
}: SelectDjItemComponentProps) => {
  const isSelected = selectedDjs?.some(
    (dj: any) => dj?.userId === item?.userId,
  );

  return (
    <Box
      mx={wp(16)}
      mb={hp(30)}
      flexDirection={'row'}
      alignItems={'center'}
      as={TouchableOpacity}
      activeOpacity={0.8}
      onPress={() => onPress(item)}>
      <Icon name={isSelected ? 'selected-dj' : 'not-selected-dj'} />

      <Box flexDirection={'row'} alignItems={'center'} ml={wp(12)}>
        <Image
          source={
            item?.profileUrl
              ? {uri: item?.profileUrl}
              : theme.images['no-profile']
          }
          style={styles.profileImage}
          resizeMode="contain"
        />

        <Box ml={wp(12)} flex={1}>
          <Box
            flexDirection={'row'}
            alignItems={'center'}
            style={styles.nameTextContainer}>
            <Box flexDirection={'row'} alignItems={'center'}>
              <Text
                variant="bodyMedium"
                fontSize={fontSz(14)}
                style={styles.nameText}
                color={theme.colors.WHITE}>
                {item?.name ? capitalizeTitle(item.name) : ''}
              </Text>
              <Icon name="verified" />
            </Box>

            <Box
              mx={wp(12)}
              width={wp(8)}
              height={hp(8)}
              bg={theme.colors.TEXT_INPUT_PLACEHOLDER}
              borderRadius={hp(16)}
            />

            <Text
              variant="bodyMedium"
              fontSize={fontSz(14)}
              color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
              ₦{formatNumberWithCommas(item?.chargePerPlay?.toString())} P/M
            </Text>
          </Box>
          <Box
            flexDirection={'row'}
            alignItems={'center'}
            style={styles.locationTextContainer}>
            <Icon name="current-location" />
            <Text
              variant="bodyMedium"
              fontSize={fontSz(14)}
              pl={wp(2)}
              color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
              {item?.address?.state
                ? `${capitalizeTitle(item.address.state)}, ${capitalizeTitle(
                    item.address.country || '',
                  )}`
                : ''}
            </Text>
          </Box>
          <Box flexDirection={'row'} alignItems={'center'}>
            <Icon name="play-location" />
            <Text
              variant="bodyMedium"
              fontSize={fontSz(14)}
              pl={wp(2)}
              numberOfLines={1}
              maxWidth={wp(230)}
              color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
              {item?.playSpotAddress || item?.playSpot
                ? `${item?.playSpotAddress || ''} ${
                    item?.playSpot || ''
                  }`.trim()
                : 'No play spot yet'}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
