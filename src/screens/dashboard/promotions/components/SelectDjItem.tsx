import React from 'react';
import {Box, Text} from 'design-system';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';
import {Image, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {Icon} from 'shared';

interface SelectDjItemProps {
  item: any;
  onPress: (selectedDj: any) => void;
  selectedDjs: any[];
}

export const SelectDjItem = ({
  item,
  onPress,
  selectedDjs,
}: SelectDjItemProps) => {
  return (
    <Box
      borderBottomWidth={1}
      p={hp(20)}
      as={TouchableOpacity}
      activeOpacity={0.8}
      onPress={onPress}
      flexDirection={'row'}
      alignItems={'center'}
      mb={hp(14)}
      borderBottomColor={theme.colors.BASE_SECONDARY}
      mx={wp(16)}>
      {selectedDjs?.includes(item) && (
        <Box mr={wp(10)}>
          <Icon name="selected-dj" />
        </Box>
      )}
      <Image
        source={
          item?.profileUrl
            ? {uri: item?.profileUrl}
            : theme.images['dj-images']['dj-1']
        }
        style={styles.profileImage}
        resizeMode="contain"
      />
      <Box ml={wp(10)}>
        <Box flexDirection={'row'} alignItems={'center'}>
          <Box flexDirection={'row'} alignItems={'center'}>
            <Text
              pr={2}
              variant="bodyBold"
              fontSize={fontSz(14)}
              color={theme.colors.WHITE}>
              {item?.name}
            </Text>
            <Icon name="verified" />
          </Box>

          {item?.connected && (
            <Box flexDirection={'row'} alignItems={'center'} ml={wp(20)}>
              <Box
                width={6}
                height={6}
                borderRadius={100}
                bg={theme.colors.TEXT_INPUT_PLACEHOLDER}
              />
              <Text
                pl={2}
                variant="bodyMedium"
                fontSize={fontSz(14)}
                color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                Connected
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
