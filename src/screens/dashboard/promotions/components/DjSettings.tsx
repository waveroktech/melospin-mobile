import React, {useState} from 'react';
import {Box, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import {ScrollView, TouchableOpacity} from 'react-native';
import {BankDetails} from './BankDetails';
import {Icon} from 'shared';
import theme from 'theme';
import {AddBank, BookingRate, Sessions} from '../modals';

export const DjSettings = () => {
  const [open, setOpen] = useState<
    'add-bank' | 'booking-rate' | 'sessions' | ''
  >('');
  return (
    <Box mt={hp(20)} height={hp(800)}>
      <ScrollView>
        <Box mx={wp(16)}>
          <BankDetails onPress={() => setOpen('add-bank')} />

          <Box
            mt={hp(20)}
            bg={theme.colors.OFF_PRIMARY_200}
            p={hp(16)}
            borderRadius={hp(24)}>
            <Box
              flexDirection={'row'}
              alignItems={'center'}
              borderBottomWidth={1}
              pb={hp(10)}
              borderBottomColor={theme.colors.BASE_SECONDARY}
              justifyContent={'space-between'}>
              <Text
                variant="bodyMedium"
                color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                Booking rate
              </Text>
              <Box
                as={TouchableOpacity}
                onPress={() => setOpen('booking-rate')}
                activeOpacity={0.8}>
                <Icon name="edit-bank-icon" />
              </Box>
            </Box>

            <Text
              pt={hp(16)}
              pb={hp(10)}
              variant="bodyMedium"
              fontSize={fontSz(14)}
              color={theme.colors.WHITE}>
              N 150,000 (per audio promotion)
            </Text>
          </Box>

          <Box
            mt={hp(20)}
            bg={theme.colors.OFF_PRIMARY_200}
            p={hp(16)}
            borderRadius={hp(24)}>
            <Box
              flexDirection={'row'}
              alignItems={'center'}
              borderBottomWidth={1}
              pb={hp(10)}
              borderBottomColor={theme.colors.BASE_SECONDARY}
              justifyContent={'space-between'}>
              <Text
                variant="bodyMedium"
                color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                Sessions
              </Text>
              <Box
                as={TouchableOpacity}
                onPress={() => setOpen('sessions')}
                activeOpacity={0.8}>
                <Icon name="edit-bank-icon" />
              </Box>
            </Box>

            <Box flexDirection={'row'} alignItems={'center'} mt={hp(16)}>
              <Box
                px={wp(10)}
                py={hp(2)}
                borderRadius={hp(24)}
                bg={theme.colors.OFF_WHITE_600}
                mr={wp(10)}>
                <Text variant="body" color={theme.colors.WHITE}>
                  Fridays
                </Text>
              </Box>
              <Box
                px={wp(10)}
                py={hp(2)}
                borderRadius={hp(24)}
                bg={theme.colors.OFF_WHITE_600}
                mr={wp(10)}>
                <Text variant="body" color={theme.colors.WHITE}>
                  Saturdays
                </Text>
              </Box>
              <Box
                px={wp(10)}
                py={hp(2)}
                borderRadius={hp(24)}
                bg={theme.colors.OFF_WHITE_600}
                mr={wp(10)}>
                <Text variant="body" color={theme.colors.WHITE}>
                  Sundays
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </ScrollView>

      <AddBank isVisible={open === 'add-bank'} onClose={() => setOpen('')} />
      <BookingRate
        isVisible={open === 'booking-rate'}
        onClose={() => setOpen('')}
      />
      <Sessions isVisible={open === 'sessions'} onClose={() => setOpen('')} />
    </Box>
  );
};
