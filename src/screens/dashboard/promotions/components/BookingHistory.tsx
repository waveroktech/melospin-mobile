import React from 'react';
import {Box, Text} from 'design-system';
import {hp, wp} from 'utils';
import {ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {Icon} from 'shared';
import theme from 'theme';
import {styles} from './style';

export const BookingHistory = () => {
  return (
    <Box mt={hp(20)}>
      <ScrollView>
        <Box mt={hp(10)} mx={wp(16)}>
          <Box
            flexDirection={'row'}
            justifyContent={'space-between'}
            borderWidth={1}
            as={TouchableOpacity}
            activeOpacity={0.8}
            borderColor={theme.colors.BASE_SECONDARY}
            borderRadius={hp(24)}
            px={wp(16)}
            py={hp(10)}
            alignSelf={'flex-start'}
            alignItems={'center'}>
            <Icon name="filter-icon" />
            <Text variant="bodyMedium" px={wp(2)} color={theme.colors.WHITE}>
              Filter by
            </Text>

            <Icon name="drop-down-icon" />
            <Text variant="bodyBold" pl={wp(2)} color={theme.colors.WHITE}>
              All Bookings
            </Text>
          </Box>

          <Box mt={hp(20)} style={styles.searchInputContainer}>
            <Icon name="search-icon" />
            <TextInput
              style={styles.searchTextInput}
              placeholder="Search DJ"
              selectionColor={theme.colors.WHITE}
              placeholderTextColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
            />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
