import React, {useState} from 'react';
import {Box, Button, FormInput, Text} from 'design-system';
import {BaseModal, ModalHeader} from 'shared';
import {hp, wp} from 'utils';
import theme from 'theme';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {BankList} from './BankList';
import {useMelospinStore, useUpdateUserBankDetails} from 'store';
import {showMessage} from 'react-native-flash-message';
import {queryClient} from 'services/api';

interface AddBankProps {
  isVisible: boolean;
  onClose: () => void;
}

interface FormData {
  bankName: string;
  accountNumber: string;
  bankCode: string;
  password: string;
  bvn: string;
}

const schema = yup.object().shape({
  bankName: yup.string().required('Bank name is required'),
  accountNumber: yup
    .string()
    .required()
    .min(10, 'Account number must be 10 digits'),
  bankCode: yup.string().required(),
  password: yup.string().required('Password is required'),
  bvn: yup.string().required('BVN is required'),
});

export const AddBank = ({isVisible, onClose}: AddBankProps) => {
  const {userData} = useMelospinStore();
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
      bvn: '',
    },
    mode: 'all',
  });

  const {mutate: updateUserBankDetails, isPending} = useUpdateUserBankDetails({
    onSuccess: (data: any) => {
      console.log(data, 'data');
      if (data?.status === 'success') {
        queryClient.invalidateQueries({queryKey: ['get-user-profile']});
        onClose();
        showMessage({
          message: 'Bank details saved successfully',
          type: 'success',
        });
        reset();
      }
      if (data?.status === 'failed') {
        showMessage({
          message: 'Bank details not saved',
          type: 'danger',
        });
      }
    },
  });

  const form = watch();

  const onSelectBank = (bank: any) => {
    setValue('bankName', bank.name);
    setValue('bankCode', bank.bankCode);
    setIsBankListVisible(false);
  };

  const handleSave = () => {
    updateUserBankDetails({
      userId: userData?.userId,
      data: {
        bankCode: form.bankCode,
        processor: 'paystack',
        accountNumber: form.accountNumber,
        password: form.password,
        bvn: form.bvn,
      },
    });
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
              value={form.bvn}
              name="bvn"
              errorText={errors.bvn?.message}
              label="Enter BVN here"
              maxLength={11}
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
            form.accountNumber?.length === 10 &&
            form.bankName &&
            form.bvn &&
            form.password.length > 7
              ? false
              : true
          }
          title="Save"
          hasBorder
          isLoading={isPending}
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
