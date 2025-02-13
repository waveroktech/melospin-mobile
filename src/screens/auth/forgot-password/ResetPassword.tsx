import React, {useState} from 'react';
import {Header, HeaderText, Screen} from 'shared';
import theme from 'theme';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {Box, Button, FormInput} from 'design-system';
import {wp} from 'utils';
import {PasswordResetSuccess} from '../modals';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'types';

interface FormData {
  confirmPassword: string;
  password: string;
}

const schema = yup.object().shape({
  confirmPassword: yup.string().required(),
  password: yup.string().required(),
});

export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [open, setOpen] = useState<'password-reset' | ''>('');

  const {navigate} = useNavigation<NavigationProp<AuthStackParamList>>();

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
      navigate('Login');
    }, 400);
  };

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.PRIMARY}>
      <Header hasBackButton goBackText="Back to login" />
      <HeaderText
        hasHeaderText="Create password"
        hasSubText="Create a new password to reset your account"
        width={wp(300)}
      />

      <Box mt={50} mx={16}>
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

      <Button
        title="Confirm"
        hasBorder
        bg={theme.colors.PRIMARY_100}
        onPress={() => setOpen('password-reset')}
      />

      <PasswordResetSuccess
        isVisible={open === 'password-reset'}
        onClose={onClose}
      />
    </Screen>
  );
};
