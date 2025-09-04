import React, {useState} from 'react';
import {Box, Button, FormInput, Text} from 'design-system';
import {BaseModal, Icon, ModalHeader} from 'shared';
import {hp, wp} from 'utils';
import theme from 'theme';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {BankDetails} from '../components';
import {useMelospinStore} from 'store';

interface CashoutProps {
  isVisible: boolean;
  onClose: () => void;
  addBank: () => void;
  handleCashout: () => void;
}

interface FormData {
  password: string;
  amount: string;
}

const schema = yup.object().shape({
  password: yup.string().required('Password is required'),
  amount: yup.string().required('Amount is required'),
});

export const Cashout = ({
  isVisible,
  onClose,
  addBank,
  handleCashout,
}: CashoutProps) => {
  const [showPassword, setShowPassword] = useState(true);
  const {userInfo} = useMelospinStore();
  const bankInfo = userInfo?.banks?.[0];
  const {
    control,
    setValue,
    watch,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      amount: '',
    },
    mode: 'all',
  });

  const form = watch();

  const handleAmountChange = (value: string) => {
    const numberAmount = Number(value.replace(/\D/g, ''));
    const formattedValue = (Number(numberAmount) || '').toLocaleString();
    setValue('amount', formattedValue);
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

          <BankDetails onPress={addBank} />

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
              containerStyle={{width: wp(230), marginBottom: hp(0)}}
              name="amount"
              keyboardType="number-pad"
              returnKeyType="done"
              value={form.amount}
              errorText={errors.amount?.message}
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
            errorText={errors.password?.message}
            onPressPasswordIcon={() => setShowPassword(!showPassword)}
          />
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
          <Button
            isNotBottom
            width={wp(150)}
            disabled={
              form.password.length >= 8 &&
              form.amount &&
              bankInfo?.accountNumber &&
              bankInfo?.bankName &&
              bankInfo?.accountName
                ? false
                : true
            }
            onPress={handleCashout}
            title="Cashout"
            hasBorder
          />
        </Box>
      </Box>
    </BaseModal>
  );
};
