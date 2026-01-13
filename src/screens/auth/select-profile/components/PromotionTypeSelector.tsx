/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useMemo} from 'react';
import {Box, Text} from 'design-system';
import {capitalizeTitle, fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'shared';
import {useGetPromotionTypes} from 'store';

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

  const {data: promotionTypes, refetch} = useGetPromotionTypes();

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Sort promotion types alphabetically
  const sortedPromotionTypes = useMemo(() => {
    if (!promotionTypes?.data) {
      return [];
    }
    return [...promotionTypes.data].sort((a, b) => {
      const titleA = a.title?.toLowerCase() || '';
      const titleB = b.title?.toLowerCase() || '';
      return titleA.localeCompare(titleB);
    });
  }, [promotionTypes?.data]);

  const selectPromotionType = (type: string) => {
    const updatedSelection = selectedPromotionTypes.includes(type)
      ? selectedPromotionTypes.filter(t => t !== type)
      : [...selectedPromotionTypes, type];
    onChange?.(updatedSelection);
  };

  const handleSelectAll = () => {
    const allTitles =
      sortedPromotionTypes.map(
        (item: {_id: string; title: string}) => item.title,
      ) || [];
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

  const allTitles =
    sortedPromotionTypes.map(
      (item: {_id: string; title: string}) => item.title,
    ) || [];
  const allSelected =
    allTitles.length > 0 &&
    allTitles.every(title => selectedPromotionTypes.includes(title));

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
        {sortedPromotionTypes.map((item: {_id: string; title: string}) => (
          <Box
            key={item._id}
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
              {capitalizeTitle(item.title || '')}
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
