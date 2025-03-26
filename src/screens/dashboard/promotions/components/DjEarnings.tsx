import React, {useState} from 'react';
import {Box, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {Icon} from 'shared';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Cashout} from '../modals';

export const DjEarnings = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const [open, setOpen] = useState<'cashout' | ''>('');
  return (
    <Box mt={hp(20)} mx={wp(16)} height={hp(800)}>
      <ScrollView>
        <Box p={hp(16)} borderRadius={hp(24)} bg={theme.colors.BASE_SECONDARY}>
          <Box flexDirection={'row'} alignItems={'center'}>
            <Icon name="money" />
            <Text variant="body" color={theme.colors.WHITE} pl={wp(10)}>
              Available balance
            </Text>
          </Box>

          <Box
            mt={hp(16)}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Box flexDirection={'row'} alignItems={'center'}>
              <Icon name="arrow-up" />
              <Text
                pl={wp(10)}
                variant="bodyBold"
                fontSize={fontSz(20)}
                color={theme.colors.WHITE}>
                N {hideBalance ? '•••••••••' : '1,000,000'}
              </Text>
            </Box>
            <Box
              as={TouchableOpacity}
              activeOpacity={0.8}
              onPress={() => setHideBalance(!hideBalance)}>
              <Icon name={hideBalance ? 'show-balance' : 'hide-balance'} />
            </Box>
          </Box>

          <Box
            borderTopWidth={1}
            borderColor={theme.colors.BASE_SECONDARY}
            borderBottomWidth={1}
            mt={hp(20)}
            py={hp(20)}>
            <Box flexDirection={'row'} alignItems={'center'}>
              <Box
                borderRightWidth={1}
                pr={wp(25)}
                borderRightColor={theme.colors.BASE_SECONDARY}>
                <Box flexDirection={'row'} alignItems={'center'}>
                  <Icon name="ledger-balance" />
                  <Text pl={wp(10)} variant="body" color={theme.colors.WHITE}>
                    Ledger Balance
                  </Text>
                </Box>
                <Box>
                  <Text
                    pt={hp(10)}
                    variant="body"
                    fontSize={fontSz(14)}
                    color={theme.colors.WHITE}>
                    N {hideBalance ? '•••••••••' : '1,000,000'}
                  </Text>
                </Box>
              </Box>

              <Box ml={wp(30)}>
                <Box flexDirection={'row'} alignItems={'center'}>
                  <Icon name="requests" />
                  <Text pl={wp(10)} variant="body" color={theme.colors.WHITE}>
                    Requests
                  </Text>
                </Box>
                <Box>
                  <Text
                    pt={hp(10)}
                    variant="bodyMedium"
                    fontFamily={theme.font.AvenirNextSemiBold}
                    fontSize={fontSz(14)}
                    color={theme.colors.WHITE}>
                    1.1k
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            mt={hp(16)}
            justifyContent={'space-between'}
            alignItems={'center'}
            as={TouchableOpacity}
            activeOpacity={0.8}
            onPress={() => setOpen('cashout')}
            p={hp(12)}
            borderWidth={1}
            borderRadius={hp(24)}
            alignSelf={'center'}
            height={hp(40)}
            flexDirection={'row'}
            width={wp(121)}
            borderColor={theme.colors.ACCENT_04}>
            <Text
              variant="bodyMedium"
              color={theme.colors.WHITE}
              bottom={hp(1)}>
              Cash out
            </Text>
            <Icon name="arrow-right-3" color={theme.colors.LIGHT_PRIMARY} />
          </Box>
        </Box>
      </ScrollView>

      <Cashout isVisible={open === 'cashout'} onClose={() => setOpen('')} />
    </Box>
  );
};
