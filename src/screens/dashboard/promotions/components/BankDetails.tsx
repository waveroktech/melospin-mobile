import React from 'react';
import {Box, Text} from 'design-system';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'shared';
import {useMelospinStore} from 'store';

interface BankDetailsProps {
  onPress?: () => void;
}

export const BankDetails = ({onPress}: BankDetailsProps) => {
  const {bankInfo} = useMelospinStore();

  return (
    <Box
      bg={theme.colors.OFF_PRIMARY_200}
      p={hp(16)}
      mt={hp(10)}
      borderRadius={hp(24)}>
      <Box
        flexDirection={'row'}
        alignItems={'center'}
        borderBottomWidth={1}
        pb={hp(16)}
        borderBottomColor={theme.colors.BASE_SECONDARY}
        justifyContent={'space-between'}>
        <Text variant="bodyMedium" color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
          Beneficiary Bank
        </Text>
        <Box as={TouchableOpacity} onPress={onPress} activeOpacity={0.8}>
          <Icon name="edit-bank-icon" />
        </Box>
      </Box>

      {bankInfo.accountNumber && bankInfo.bankName && bankInfo.accountName ? (
        <Box mt={hp(20)} flexDirection={'row'}>
          <Box flexDirection={'row'} alignItems={'center'}>
            <Icon name="bank-icon" />
            <Box ml={wp(10)}>
              <Text
                variant="bodyMedium"
                fontSize={fontSz(14)}
                color={theme.colors.WHITE}>
                {bankInfo.accountNumber} - {bankInfo.bankName}
              </Text>
              <Text
                variant="body"
                color={theme.colors.OFF_WHITE_100}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{textTransform: 'capitalize'}}
                fontSize={fontSz(12)}>
                {bankInfo.accountName}
              </Text>
            </Box>
          </Box>
          <Box
            bg={theme.colors.SEMANTIC_GREEN}
            p={hp(1)}
            ml={wp(10)}
            borderRadius={hp(12)}
            alignSelf={'flex-start'}>
            <Text
              variant="bodyMedium"
              fontSize={fontSz(12)}
              color={theme.colors.DARKER_GREEN}>
              Active
            </Text>
          </Box>
        </Box>
      ) : (
        <Box mt={hp(20)}>
          <Text variant="bodyMedium" color={theme.colors.WHITE}>
            No bank details added
          </Text>
        </Box>
      )}
    </Box>
  );
};
