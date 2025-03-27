import React, {useState} from 'react';
import {Box, Button, FormInput, Text} from 'design-system';
import {BaseModal, ModalHeader} from 'shared';
import {hp, wp} from 'utils';
import theme from 'theme';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

interface AddBankProps {
  isVisible: boolean;
  onClose: () => void;
}

interface FormData {
  bankName: string;
  accountNumber: string;
  password: string;
}

const schema = yup.object().shape({
  bankName: yup.string().required(),
  accountNumber: yup.string().required(),
  password: yup.string().required(),
});

export const AddBank = ({isVisible, onClose}: AddBankProps) => {
  const [showPassword, setShowPassword] = useState(true);
  const {control, watch} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      bankName: '',
      password: '',
      accountNumber: '',
    },
    mode: 'all',
  });

  const form = watch();

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
              label="Select bank"
              isDropDown
            />

            <FormInput
              control={control}
              value={form.accountNumber}
              name="accountNumber"
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
              label="Enter password here to confirm"
              onPressPasswordIcon={() => setShowPassword(!showPassword)}
            />
          </Box>
        </Box>

        <Button isNotBottom my={hp(20)} title="Save" hasBorder mx={wp(16)} />
      </Box>
    </BaseModal>
  );
};
