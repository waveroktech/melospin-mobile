import React from 'react';
import {Box, Text} from 'design-system';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';
import {Image} from 'react-native';
import {styles} from './style';
import {Icon} from 'shared';

interface SelectDjItemProps {
  item: any;
}

export const SelectDjItem = ({item}: SelectDjItemProps) => {
  return (
    <Box
      borderBottomWidth={1}
      p={hp(20)}
      flexDirection={'row'}
      alignItems={'center'}
      mb={hp(20)}
      borderBottomColor={theme.colors.BASE_SECONDARY}
      mx={wp(16)}>
      <Image
        source={item?.profile}
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
              {item?.title}
            </Text>
            <Icon name="verified" />
          </Box>

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
        </Box>
        <Box flexDirection={'row'} mt={2} alignItems={'center'}>
          <Icon name="tag" />
          <Text
            pl={2}
            variant="body"
            fontSize={fontSz(14)}
            color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
            {item?.rate}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
