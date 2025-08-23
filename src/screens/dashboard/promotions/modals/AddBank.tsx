import React, {useState} from 'react';
import {Box, Button, FormInput, Text} from 'design-system';
import {BaseModal, ModalHeader} from 'shared';
import {hp, wp} from 'utils';
import theme from 'theme';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {BankList} from './BankList';
import {useMelospinStore} from 'store';
import {showMessage} from 'react-native-flash-message';

interface AddBankProps {
  isVisible: boolean;
  onClose: () => void;
}

interface FormData {
  bankName: string;
  accountNumber: string;
  bankCode: string;
  password: string;
}

const schema = yup.object().shape({
  bankName: yup.string().required('Bank name is required'),
  accountNumber: yup
    .string()
    .required()
    .min(10, 'Account number must be 10 digits'),
  bankCode: yup.string().required(),
  password: yup.string().required('Password is required'),
});

export const AddBank = ({isVisible, onClose}: AddBankProps) => {
  const {userData, setBankInfo} = useMelospinStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isBankListVisible, setIsBankListVisible] = useState(false);
  const {
    control,
    watch,
    setValue,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      bankName: '',
      bankCode: '',
      password: '',
      accountNumber: '',
    },
    mode: 'all',
  });

  const form = watch();

  const onSelectBank = (bank: any) => {
    setValue('bankName', bank.bankName);
    setValue('bankCode', bank.bankCode);
    setIsBankListVisible(false);
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setBankInfo({
        bankName: form.bankName,
        accountNumber: form.accountNumber,
        bankCode: form.bankCode,
        accountName: userData?.firstName + ' ' + userData?.lastName,
      });
      setIsLoading(false);
      onClose();
      showMessage({
        message: 'Bank details saved successfully',
        type: 'success',
        duration: 3000,
      });
      reset();
    }, 1000);
  };

  return (
    <BaseModal
      visible={isVisible}
      onClose={onClose}
      dialogContainerStyle={{
        backgroundColor: theme.colors.BASE_PRIMARY,
        borderTopWidth: hp(0),
      }}>
      <Box py={hp(20)}>
        <ModalHeader
          hasBackIcon
          onClose={onClose}
          iconName="back-icon"
          modalHeaderText="Beneficiary bank details"
        />

        <Box mt={hp(20)} mx={wp(16)}>
          <Text variant="body" color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
            Confirm your default account details to receive payments for
            promotions.
          </Text>

          <Box mt={hp(40)}>
            <FormInput
              control={control}
              name="bankName"
              value={form.bankName}
              errorText={errors.bankName?.message}
              label="Select bank"
              isDropDown
              onPressDropDown={() => setIsBankListVisible(true)}
            />

            <FormInput
              control={control}
              value={form.accountNumber}
              name="accountNumber"
              maxLength={10}
              errorText={errors.accountNumber?.message}
              label="Enter account number here"
              keyboardType="number-pad"
              returnKeyType="done"
            />

            <FormInput
              control={control}
              value={form.password}
              name="password"
              isPassword
              secureTextEntry={showPassword}
              errorText={errors.password?.message}
              label="Enter password here to confirm"
              onPressPasswordIcon={() => setShowPassword(!showPassword)}
            />
          </Box>
        </Box>

        <Button
          isNotBottom
          my={hp(20)}
          disabled={
            form.bankCode &&
            form.accountNumber &&
            form.bankName &&
            form.password.length > 7
              ? false
              : true
          }
          title="Save"
          hasBorder
          isLoading={isLoading}
          onPress={handleSave}
          mx={wp(16)}
        />
      </Box>
      <BankList
        isVisible={isBankListVisible}
        onClose={() => setIsBankListVisible(false)}
        onSelectBank={onSelectBank}
      />
    </BaseModal>
  );
};
