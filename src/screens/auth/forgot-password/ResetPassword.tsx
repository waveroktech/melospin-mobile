import React, {useCallback, useState} from 'react';
import {Header, HeaderText, Loader, Screen} from 'shared';
import theme from 'theme';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {Box, Button, FormInput} from 'design-system';
import {wp} from 'utils';
import {PasswordResetSuccess} from '../modals';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {AuthStackParamList} from 'types';
import {usePasswordReset} from 'store';
import {showMessage} from 'react-native-flash-message';

interface FormData {
  confirmPassword: string;
  password: string;
}

const schema = yup.object().shape({
  password: yup
    .string()
    .required()
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [open, setOpen] = useState<'password-reset' | ''>('');

  const params =
    useRoute<RouteProp<AuthStackParamList, 'ResetPassword'>>()?.params;
  const {navigate} = useNavigation<NavigationProp<AuthStackParamList>>();

  const {
    control,
    watch,
    formState: {errors},
  } = useForm<FormData>({
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

  const {mutate: resetPassword, isPending} = usePasswordReset({
    onSuccess: (data: any) => {
      console.log(data);
      if (data?.status === 'failed') {
        return showMessage({
          message: data?.message,
          type: 'danger',
          duration: 2000,
        });
      }
      if (data?.status === 'success') {
        setOpen('password-reset');
      }
    },
  });

  const handlePasswordReset = useCallback(() => {
    resetPassword({
      identifier: params?.data.identifier,
      password: form.password,
      resetToken: params?.data.resetToken,
      confirmPassword: form.confirmPassword,
    });
  }, [
    form.confirmPassword,
    form.password,
    params?.data.identifier,
    params?.data.resetToken,
    resetPassword,
  ]);

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
          errorText={errors.password?.message}
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
          errorText={errors.confirmPassword?.message}
          onPressPasswordIcon={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
        />
      </Box>

      <Button
        title="Confirm"
        hasBorder
        disabled={
          form.confirmPassword === form.password &&
          form.confirmPassword &&
          form.password
            ? false
            : true
        }
        bg={theme.colors.PRIMARY_100}
        onPress={handlePasswordReset}
      />

      <PasswordResetSuccess
        isVisible={open === 'password-reset'}
        onClose={onClose}
      />

      <Loader loading={isPending} />
    </Screen>
  );
};
