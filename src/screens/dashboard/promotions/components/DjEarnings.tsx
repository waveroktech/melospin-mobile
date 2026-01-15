import React, {useState} from 'react';
import {Box, Text} from 'design-system';
import {fontSz, formatNumberWithCommas, hp, wp} from 'utils';
import theme from 'theme';
import {Icon} from 'shared';
import {ImageBackground, ScrollView, TouchableOpacity} from 'react-native';
import {Cashout} from '../modals';
import {styles} from './style';
import {showMessage} from 'react-native-flash-message';
import {useMelospinStore} from 'store';

interface DjEarningsProps {
  setActiveIndex: (index: number) => void;
}

export const DjEarnings = ({setActiveIndex}: DjEarningsProps) => {
  const [hideBalance, setHideBalance] = useState(false);
  const [open, setOpen] = useState<'cashout' | ''>('');
  const {userInfo} = useMelospinStore();
  const balance = userInfo?.balance;
  console.log(balance, 'balance');

  const addBank = () => {
    setOpen('');
    // Navigate to DJSettings tab (index 3) with a small delay for smoother transition
    setTimeout(() => {
      setActiveIndex(3);
    }, 300);
  };

  const handleCashout = () => {
    setOpen('');
    // Navigate to DJSettings tab (index 3) with a small delay for smoother transition
    setTimeout(() => {
      showMessage({
        message: 'Cashout successful',
        type: 'success',
        duration: 2000,
      });
    }, 300);
  };

  return (
    <Box mt={hp(20)} mx={wp(16)} height={hp(800)}>
      <ScrollView contentContainerStyle={{paddingBottom: hp(100)}}>
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
                N{' '}
                {hideBalance
                  ? '•••••••••'
                  : formatNumberWithCommas(balance?.availableBalance)}
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
                    N {hideBalance ? '•••••••••' : balance?.ledgerBalance}
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
                    {userInfo?.requests || 0}
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
            style={{padding: hp(5)}}
            px={wp(13)}
            borderWidth={1}
            borderRadius={hp(24)}
            alignSelf={'center'}
            flexDirection={'row'}
            borderColor={theme.colors.ACCENT_04}>
            <Text
              variant="bodyMedium"
              lineHeight={hp(24)}
              color={theme.colors.WHITE}>
              Cash out
            </Text>
            <Icon name="arrow-right-3" color={theme.colors.LIGHT_PRIMARY} />
          </Box>
        </Box>

        <Box
          mt={hp(20)}
          bg={theme.colors.OFF_PRIMARY_200}
          borderRadius={hp(32)}
          p={hp(20)}>
          <Box
            borderBottomWidth={1}
            pb={hp(10)}
            borderColor={theme.colors.GREY_100}>
            <Text variant="bodyMedium" color={theme.colors.GREY_100}>
              Latest Transactions
            </Text>
          </Box>
          <Box mt={hp(20)}>
            {Array.from({length: 2}).map((_, index) => {
              return (
                <Box
                  key={index}
                  mb={hp(20)}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Box flexDirection={'row'} alignItems={'center'}>
                    <ImageBackground
                      source={theme.images.upload}
                      imageStyle={styles.transactionImageStyle}
                      style={styles.transactionImage}>
                      <Icon name="song-uploads" />
                    </ImageBackground>

                    <Box ml={wp(10)}>
                      <Box flexDirection={'row'} alignItems={'center'}>
                        <Text variant="bodyMedium" color={theme.colors.WHITE}>
                          Erima.mp3
                        </Text>
                        <Box
                          bg={theme.colors.SEMANTIC_GREEN}
                          ml={wp(2)}
                          p={1}
                          borderRadius={hp(12)}>
                          <Text
                            variant="bodyMedium"
                            fontSize={fontSz(11)}
                            color={theme.colors.DARKER_GREEN}>
                            Paid
                          </Text>
                        </Box>
                      </Box>
                      <Text
                        variant="body"
                        style={{fontSize: fontSz(10)}}
                        pt={hp(2)}
                        color={theme.colors.OFF_WHITE_100}>
                        Shared with DJ Zenzee & 25 Others
                      </Text>
                    </Box>
                  </Box>
                  <Box alignItems={'flex-end'}>
                    <Text
                      variant="body"
                      fontSize={fontSz(13)}
                      color={theme.colors.WHITE}>
                      ₦300,000
                    </Text>
                    <Text
                      variant="body"
                      fontSize={fontSz(10)}
                      color={theme.colors.OFF_WHITE_100}
                      pt={hp(2)}>
                      12 Feb 2025
                    </Text>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </ScrollView>

      <Cashout
        isVisible={open === 'cashout'}
        onClose={() => setOpen('')}
        addBank={addBank}
        handleCashout={handleCashout}
      />
    </Box>
  );
};
