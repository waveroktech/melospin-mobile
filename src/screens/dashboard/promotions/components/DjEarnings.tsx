import React, {useState} from 'react';
import {Box, Text} from 'design-system';
import {fontSz, formatNumberWithCommas, hp, wp} from 'utils';
import theme from 'theme';
import {Icon} from 'shared';
import {ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {Cashout} from '../modals';
import {showMessage} from 'react-native-flash-message';
import {useGetPayments, useMelospinStore} from 'store';
import {EmptyPromotionContainer} from './EmptyPromotionContainer';
import {TransactionItem} from './TransactionItem';

interface DjEarningsProps {
  setActiveIndex: (index: number) => void;
}

export const DjEarnings = ({setActiveIndex}: DjEarningsProps) => {
  const [hideBalance, setHideBalance] = useState(false);
  const [open, setOpen] = useState<'cashout' | ''>('');
  const {userInfo} = useMelospinStore();
  const balance = userInfo?.balance;

  const {data: payments, isLoading: isLoadingPayments} = useGetPayments(true);

  // Extract transactions from nested response structure
  // Response structure: { status: "success", data: { status: "success", data: [...], extraData: {...} } }
  const transactionsData = payments?.data?.data?.data || payments?.data?.data || [];

  // Map API transaction data to TransactionItem format
  const transactions = transactionsData.map((transaction: any) => {
    // Determine status and colors based on transaction status
    const getStatusInfo = (status: string) => {
      const normalizedStatus = status?.toLowerCase() || '';
      if (normalizedStatus === 'paid' || normalizedStatus === 'completed' || normalizedStatus === 'success') {
        return {
          status: 'Paid',
          statusColor: theme.colors.SEMANTIC_GREEN,
          statusTextColor: theme.colors.DARKER_GREEN,
        };
      } else if (normalizedStatus === 'pending' || normalizedStatus === 'processing') {
        return {
          status: 'Pending',
          statusColor: theme.colors.CREAM,
          statusTextColor: theme.colors.SEMANTIC_YELLOW,
        };
      } else if (normalizedStatus === 'failed' || normalizedStatus === 'rejected' || normalizedStatus === 'declined') {
        return {
          status: 'Failed',
          statusColor: theme.colors.RED,
          statusTextColor: theme.colors.WHITE,
        };
      }
      return {
        status: status || 'Pending',
        statusColor: theme.colors.CREAM,
        statusTextColor: theme.colors.SEMANTIC_YELLOW,
      };
    };

    const statusInfo = getStatusInfo(transaction.status || transaction.paymentStatus);

    // Format date
    const formatDate = (dateString: string) => {
      if (!dateString) {
        return '';
      }
      try {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', {month: 'short'});
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      } catch {
        return dateString;
      }
    };

    // Format amount
    const formatAmount = (amount: number | string) => {
      if (!amount) {
        return '₦0';
      }
      const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
      return `₦${formatNumberWithCommas(numAmount)}`;
    };

    return {
      id: transaction.id || transaction._id,
      title: transaction.title || transaction.promotionTitle || transaction.description || 'Transaction',
      status: statusInfo.status,
      statusColor: statusInfo.statusColor,
      statusTextColor: statusInfo.statusTextColor,
      sharedWith: transaction.sharedWith || (transaction.djCount ? `Shared with ${transaction.djCount} DJ${transaction.djCount > 1 ? 's' : ''}` : 'Transaction'),
      amount: formatAmount(transaction.amount || transaction.totalAmount || 0),
      date: formatDate(transaction.createdAt || transaction.date || transaction.transactionDate),
    };
  });

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
            // borderBottomWidth={1}
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

          {/* <Box
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
          </Box> */}
        </Box>

        <Box
          mt={hp(20)}
          bg={theme.colors.OFF_PRIMARY_200}
          borderRadius={hp(32)}
          p={hp(20)}>
          <Box
            borderBottomWidth={1}
            pb={hp(12)}
            borderColor={theme.colors.GREY_100}>
            <Text variant="bodyMedium" color={theme.colors.GREY_100}>
              Latest Transactions
            </Text>
          </Box>
          <Box mt={hp(20)}>
            {isLoadingPayments ? (
              <Box
                justifyContent="center"
                alignItems="center"
                py={hp(40)}>
                <Text variant="body" color={theme.colors.OFF_WHITE_100}>
                  Loading transactions...
                </Text>
              </Box>
            ) : transactions.length > 0 ? (
              <FlatList
                data={transactions}
                scrollEnabled={false}
                nestedScrollEnabled={true}
                keyExtractor={(item, index) =>
                  item.id || item._id || `transaction-${index}`
                }
                renderItem={({item: transaction}) => (
                  <TransactionItem
                    title={transaction.title}
                    status={transaction.status}
                    statusColor={transaction.statusColor}
                    statusTextColor={transaction.statusTextColor}
                    sharedWith={transaction.sharedWith}
                    amount={transaction.amount}
                    date={transaction.date}
                  />
                )}
                ListEmptyComponent={
                  <EmptyPromotionContainer
                    containerStyles={{my: hp(20)}}
                    icon="empty-folder"
                    title="No Transactions Yet"
                    subTitle="Your transaction history will appear here once you start earning from promotions."
                  />
                }
              />
            ) : (
              <EmptyPromotionContainer
                containerStyles={{my: hp(20)}}
                icon="empty-folder"
                title="No Transactions Yet"
                subTitle="Your transaction history will appear here once you start earning from promotions."
              />
            )}
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
