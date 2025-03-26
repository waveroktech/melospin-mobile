import React, {useState} from 'react';
import {Box, Button, FormInput, Text} from 'design-system';
import {BaseModal, Icon, ModalHeader} from 'shared';
import {fontSz, formatNumberWithCommas, hp, wp} from 'utils';
import theme from 'theme';
import {TouchableOpacity} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';

interface CashoutProps {
  isVisible: boolean;
  onClose: () => void;
}

interface FormData {
  password: string;
  amount: string;
}

const schema = yup.object().shape({
  password: yup.string().required(),
  amount: yup.string().required(),
});

export const Cashout = ({isVisible, onClose}: CashoutProps) => {
  const [showPassword, setShowPassword] = useState(true);
  const {control, setValue, watch} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',

      amount: '',
    },
    mode: 'all',
  });

  const form = watch();

  const handleAmountChange = (value: string) => {
    setValue('amount', formatNumberWithCommas(value));
  };

  return (
    <BaseModal
      visible={isVisible}
      onClose={onClose}
      dialogContainerStyle={{
        backgroundColor: theme.colors.BASE_PRIMARY,
        borderTopWidth: hp(0),
      }}>
      <Box py={hp(24)}>
        <ModalHeader
          hasBackIcon
          iconName="back-icon"
          modalHeaderText="Cash out Balance"
          onClose={onClose}
        />

        <Box mt={hp(20)} mx={wp(16)}>
          <Text variant="body" color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
            Confirm details to continue
          </Text>

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
              <Text
                variant="bodyMedium"
                color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                Beneficiary Bank
              </Text>
              <Box as={TouchableOpacity} activeOpacity={0.8}>
                <Icon name="edit-bank-icon" />
              </Box>
            </Box>

            <Box mt={hp(20)} flexDirection={'row'}>
              <Box flexDirection={'row'} alignItems={'center'}>
                <Icon name="bank-icon" />
                <Box ml={wp(10)}>
                  <Text
                    variant="bodyMedium"
                    fontSize={fontSz(14)}
                    color={theme.colors.WHITE}>
                    0732483610 - Access Bank
                  </Text>
                  <Text
                    variant="body"
                    color={theme.colors.OFF_WHITE_100}
                    fontSize={fontSz(12)}>
                    Celestine Zenzee
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

            <Box
              flexDirection={'row'}
              alignItems={'center'}
              my={hp(24)}
              justifyContent={'space-between'}>
              <Box
                flexDirection={'row'}
                alignItems={'center'}
                height={hp(59)}
                borderRadius={hp(24)}
                width={wp(98)}
                px={wp(20)}
                justifyContent={'space-between'}
                bg={theme.colors.TEXT_INPUT_BG}>
                <Text variant="body" color={theme.colors.WHITE}>
                  NGN
                </Text>
                <Icon name="chevron-down" />
              </Box>

              <FormInput
                control={control}
                containerStyle={{width: wp(200), marginBottom: hp(0)}}
                name="amount"
                value={form.amount}
                onChangeText={(text: string) => handleAmountChange(text)}
                label="Enter budget amount"
              />
            </Box>

            <FormInput
              control={control}
              name="password"
              label="Enter password here"
              isPassword
              value={form.password}
              secureTextEntry={showPassword}
              onPressPasswordIcon={() => setShowPassword(!showPassword)}
              containerStyle={{width: wp(310)}}
            />
          </Box>
        </Box>

        <Box
          my={hp(30)}
          mx={wp(16)}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Button
            isNotBottom
            width={wp(150)}
            title="Cancel"
            onPress={onClose}
          />
          <Button isNotBottom width={wp(150)} title="Cashout" hasBorder />
        </Box>
      </Box>
    </BaseModal>
  );
};
