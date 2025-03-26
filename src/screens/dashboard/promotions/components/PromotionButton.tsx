import React from 'react';
import {Box, Text} from 'design-system';
import {TouchableOpacity} from 'react-native';
import theme from 'theme';
import {hp, wp} from 'utils';

interface PromotionButtonProps {
  tab: {
    title: string;
    id: number;
  };
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export const PromotionButton = ({
  tab,
  activeIndex,
  setActiveIndex,
}: PromotionButtonProps) => {
  return (
    <Box
      as={TouchableOpacity}
      px={hp(24)}
      mr={wp(16)}
      py={hp(16)}
      activeOpacity={0.8}
      borderRadius={hp(22)}
      borderWidth={activeIndex === tab.id ? 1 : 0}
      borderColor={theme.colors.ACCENT_03}
      onPress={() => setActiveIndex(tab.id)}
      bg={
        activeIndex === tab.id
          ? theme.colors.PRIMARY_200
          : theme.colors.OFF_BLACK_100
      }>
      <Text variant="body" color={theme.colors.WHITE}>
        {tab.title}
      </Text>
    </Box>
  );
};
