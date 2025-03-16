import React, {useState} from 'react';
import {Box, Button, FormInput} from 'design-system';
import {Header, HeaderText, Screen} from 'shared';
import {wp} from 'utils';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import theme from 'theme';
import {PasswordResetSuccess} from 'screens/auth/modals';
import {useNavigation} from '@react-navigation/native';

interface FormData {
  confirmPassword: string;
  password: string;
  oldPassword: string;
}

const schema = yup.object().shape({
  confirmPassword: yup.string().required(),
  password: yup.string().required(),
  oldPassword: yup.string().required(),
});

export const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [open, setOpen] = useState<'password-reset' | ''>('');

  const {goBack} = useNavigation();

  const {control, watch} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
    mode: 'all',
  });

  const form = watch();

  const onClose = async () => {
    setOpen('');
    setTimeout(() => {
      goBack();
    }, 400);
  };

  return (
    <Screen removeSafeaArea>
      <Header hasBackButton />
      <HeaderText
        hasHeaderText="Edit Password"
        width={wp(300)}
        hasSubText="Enter code sent to your email address"
      />

      <Box mt={50} mx={wp(16)}>
        <FormInput
          label="Enter old password here"
          autoCapitalize="none"
          control={control}
          name="password"
          isPassword
          value={form.oldPassword}
          secureTextEntry={showOldPassword}
          onPressPasswordIcon={() => setShowOldPassword(!showOldPassword)}
        />
        <FormInput
          label="Create new password here"
          autoCapitalize="none"
          control={control}
          name="password"
          isPassword
          value={form.password}
          secureTextEntry={showPassword}
          onPressPasswordIcon={() => setShowPassword(!showPassword)}
        />
        <FormInput
          label="Re-enter password here"
          autoCapitalize="none"
          control={control}
          name="confirmPassword"
          isPassword
          value={form.confirmPassword}
          secureTextEntry={showConfirmPassword}
          onPressPasswordIcon={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
        />
      </Box>

      <Button hasBorder title="Confirm" bg={theme.colors.PRIMARY_100} />

      <PasswordResetSuccess
        isVisible={open === 'password-reset'}
        onClose={onClose}
      />
    </Screen>
  );
};
