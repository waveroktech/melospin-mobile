import React, {useState} from 'react';
import {Box, Text} from 'design-system';
import {fontSz, formatNumberWithCommas, hp, wp} from 'utils';
import {ScrollView, TouchableOpacity} from 'react-native';
import {BankDetails} from './BankDetails';
import {Icon} from 'shared';
import theme from 'theme';
import {AddBank, BookingRate, Sessions} from '../modals';
import {useMelospinStore} from 'store';

export const DjSettings = () => {
  const [open, setOpen] = useState<
    'add-bank' | 'booking-rate' | 'sessions' | ''
  >('');

  const {playSessions, userInfo} = useMelospinStore();

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
              N {formatNumberWithCommas(userInfo?.chargePerPlay?.toString())}{' '}
              (per audio promotion)
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

            <Box
              flexDirection={'row'}
              alignItems={'center'}
              flexWrap={'wrap'}
              mt={hp(16)}>
              {userInfo?.playingDays?.map((session: any, index: number) => {
                return (
                  <Box
                    key={index}
                    mb={hp(12)}
                    px={wp(2)}
                    py={hp(2)}
                    borderRadius={hp(24)}
                    bg={theme.colors.OFF_WHITE_600}
                    mr={wp(12)}>
                    <Text
                      variant="body"
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{textTransform: 'capitalize'}}
                      color={theme.colors.WHITE}>
                      {session}
                    </Text>
                  </Box>
                );
              })}
              {userInfo?.playingDays?.length === 0 && (
                <Text
                  variant="bodyMedium"
                  fontSize={fontSz(14)}
                  fontFamily={theme.font.AvenirNextMedium}
                  color={theme.colors.WHITE}>
                  No sessions selected
                </Text>
              )}
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
