/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import {Box, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {promotionTypeList} from 'data';
import {Icon} from 'shared';

interface PromotionTypeSelectorProps {
  value?: string[];
  onChange?: (selectedTypes: string[]) => void;
  onSelectAll?: () => void;
  title?: string;
}

export const PromotionTypeSelector = ({
  title,
  value = [],
  onChange,
  onSelectAll,
}: PromotionTypeSelectorProps) => {
  const selectedPromotionTypes = value;

  const selectPromotionType = (type: string) => {
    const updatedSelection = selectedPromotionTypes.includes(type)
      ? selectedPromotionTypes.filter(t => t !== type)
      : [...selectedPromotionTypes, type];
    onChange?.(updatedSelection);
  };

  const handleSelectAll = () => {
    const allTitles = promotionTypeList.map(item => item.title);
    const allSelected = allTitles.every(title =>
      selectedPromotionTypes.includes(title),
    );

    if (allSelected) {
      // Deselect all
      onChange?.([]);
    } else {
      // Select all
      onChange?.(allTitles);
    }

    // Call the prop callback if provided
    onSelectAll?.();
  };

  const allTitles = promotionTypeList.map(item => item.title);
  const allSelected = allTitles.every(title =>
    selectedPromotionTypes.includes(title),
  );

  return (
    <Box
      mb={hp(24)}
      bg={theme.colors.TEXT_INPUT_BG}
      borderRadius={hp(24)}
      px={wp(16)}
      py={hp(12)}>
      <Box
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Text variant="body" fontSize={fontSz(14)} color={theme.colors.WHITE}>
          {title || 'Select promotion type'}
        </Text>

        <Box
          as={TouchableOpacity}
          activeOpacity={0.8}
          onPress={handleSelectAll}>
          <Text
            variant="body"
            fontSize={fontSz(14)}
            color={theme.colors.LIGHT_PRIMARY}
            style={styles.textDecoration}>
            {allSelected ? 'Unselect all' : 'Select all'}
          </Text>
        </Box>
      </Box>

      <Box flexDirection={'row'} flexWrap={'wrap'} mt={hp(16)}>
        {promotionTypeList.map((item: {id: number; title: string}) => (
          <Box
            key={item.id}
            flexDirection={'row'}
            alignItems={'center'}
            onPress={() => selectPromotionType(item?.title)}
            as={TouchableOpacity}
            activeOpacity={0.8}
            px={wp(12)}
            py={2}
            borderRadius={hp(24)}
            mr={wp(10)}
            mb={hp(12)}
            bg={theme.colors.BASE_SECONDARY}>
            <Icon
              name={
                selectedPromotionTypes?.includes(item?.title)
                  ? 'active-checkbox'
                  : 'checkbox'
              }
            />
            <Text
              variant="body"
              fontSize={fontSz(14)}
              color={theme.colors.WHITE}
              pl={wp(2)}>
              {item.title}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  textDecoration: {
    textDecorationLine: 'underline',
  },
});
