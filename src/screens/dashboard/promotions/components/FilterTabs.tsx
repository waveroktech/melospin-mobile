import React from 'react';
import {Box, Text} from 'design-system';
import {hp, wp} from 'utils';
import theme from 'theme';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Icon} from 'shared';
import {styles} from './style';

interface FilterTabsProps {
  title: string;
  setOpen: (open: string) => void;
  selectedRate?: string;
  selectedState?: string;
}

export const FilterTabs = ({
  title,
  setOpen,
  selectedRate,
  selectedState,
}: FilterTabsProps) => {
  return (
    <Box mx={wp(16)} mt={hp(24)}>
      <Text variant="bodySemiBold" color={theme.colors.WHITE}>
        {title}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Box
          as={TouchableOpacity}
          onPress={() => setOpen('rate')}
          activeOpacity={0.8}
          style={styles.filterContainer}>
          <Text variant="body" color={theme.colors.ACCENT_04}>
            Rate
          </Text>
          <Box mx={wp(2)}>
            <Icon name="arrow-down" />
          </Box>
          <Text variant="bodyBold" color={theme.colors.ACCENT_04}>
            {selectedRate || 'Select Rate'}
          </Text>
        </Box>

        <Box style={styles.filterContainer}>
          <Text variant="body" color={theme.colors.ACCENT_04}>
            Country
          </Text>
          <Box mx={wp(2)}>
            <Icon name="arrow-down" />
          </Box>
          <Text variant="bodyBold" color={theme.colors.ACCENT_04}>
            Nigeria
          </Text>
        </Box>

        <Box
          style={styles.filterContainer}
          as={TouchableOpacity}
          activeOpacity={0.8}
          onPress={() => setOpen('state')}>
          <Text variant="body" color={theme.colors.ACCENT_04}>
            State
          </Text>
          <Box mx={wp(2)}>
            <Icon name="arrow-down" />
          </Box>
          <Text variant="bodyBold" color={theme.colors.ACCENT_04}>
            {selectedState || 'Select State'}
          </Text>
        </Box>
      </ScrollView>
    </Box>
  );
};
