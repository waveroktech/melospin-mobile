import React from 'react';
import {Box, Text} from 'design-system';
import {hp, wp} from 'utils';
import theme from 'theme';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Icon} from 'shared';
import {styles} from './style';

export interface FilterOption {
  label: string;
  value?: string;
  placeholder?: string;
  onPress?: () => void;
  disabled?: boolean;
  defaultValue?: string;
}

interface FilterTabsProps {
  title?: string;
  filters?: FilterOption[];
  // Legacy props for backward compatibility
  setOpen?: (open: string) => void;
  selectedRate?: string;
  selectedState?: string;
}

const DEFAULT_FILTERS: FilterOption[] = [
  {
    label: 'Rate',
    placeholder: 'Select Rate',
    onPress: () => {},
  },
  {
    label: 'Country',
    value: 'Nigeria',
    disabled: true,
  },
  {
    label: 'State',
    placeholder: 'Select State',
    onPress: () => {},
  },
];

export const FilterTabs = ({
  title,
  filters,
  setOpen,
  selectedRate,
  selectedState,
}: FilterTabsProps) => {
  // Use custom filters if provided, otherwise use defaults with legacy props
  const getFilters = (): FilterOption[] => {
    if (filters && filters.length > 0) {
      return filters;
    }

    // Legacy support: map old props to filter options
    return DEFAULT_FILTERS.map(filter => {
      if (filter.label === 'Rate') {
        return {
          ...filter,
          value: selectedRate,
          onPress: setOpen ? () => setOpen('rate') : undefined,
        };
      }
      if (filter.label === 'State') {
        return {
          ...filter,
          value: selectedState,
          onPress: setOpen ? () => setOpen('state') : undefined,
        };
      }
      return filter;
    });
  };

  const filterOptions = getFilters();

  const renderFilterItem = (filter: FilterOption, index: number) => {
    const displayValue =
      filter.value || filter.defaultValue || filter.placeholder || '';
    const isClickable = filter.onPress && !filter.disabled;

    const FilterBox = isClickable ? TouchableOpacity : Box;

    return (
      <Box
        key={`${filter.label}-${index}`}
        as={isClickable ? FilterBox : undefined}
        onPress={isClickable ? filter.onPress : undefined}
        activeOpacity={isClickable ? 0.8 : 1}
        style={styles.filterContainer}>
        <Text variant="body" color={theme.colors.ACCENT_04}>
          {filter.label}
        </Text>
        <Box mx={wp(2)}>
          <Icon name="arrow-down" />
        </Box>
        <Text variant="bodyBold" color={theme.colors.ACCENT_04}>
          {displayValue}
        </Text>
      </Box>
    );
  };

  return (
    <Box mx={wp(16)} mt={hp(24)}>
      {title && (
        <Text variant="bodySemiBold" color={theme.colors.WHITE}>
          {title}
        </Text>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filterOptions.map((filter, index) => renderFilterItem(filter, index))}
      </ScrollView>
    </Box>
  );
};
