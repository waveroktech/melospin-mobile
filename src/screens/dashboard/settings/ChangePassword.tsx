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
import {useChangeUserPassword, useMelospinStore} from 'store';
import {showMessage} from 'react-native-flash-message';

interface FormData {
  confirmPassword: string;
  password: string;
  oldPassword: string;
}

const schema = yup.object().shape({
  oldPassword: yup.string().required('Old password is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [open, setOpen] = useState<'password-reset' | ''>('');

  const {goBack} = useNavigation();
  const {userData} = useMelospinStore();

  const {mutate: changeUserPassword, isPending} = useChangeUserPassword({
    onSuccess: (data: any) => {
      if (data?.status === 'success') {
        setOpen('password-reset');
      } else {
        showMessage({
          message: data?.message,
          type: 'danger',
        });
      }
    },
  });

  const {
    control,
    watch,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      confirmPassword: '',
      password: '',
      oldPassword: '',
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

  const handleChangeUserPassword = () => {
    changeUserPassword({
      userId: userData?.userId,
      data: {
        password: form.password,
        confirmPassword: form.confirmPassword,
        currentPassword: form.oldPassword,
      },
    });
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
          name="oldPassword"
          isPassword
          value={form.oldPassword}
          secureTextEntry={showOldPassword}
          onPressPasswordIcon={() => setShowOldPassword(!showOldPassword)}
          errorText={errors.oldPassword?.message}
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
          errorText={errors.password?.message}
        />
        <FormInput
          label="Re-enter password here"
          autoCapitalize="none"
          control={control}
          name="confirmPassword"
          isPassword
          value={form.confirmPassword}
          errorText={errors.confirmPassword?.message}
          secureTextEntry={showConfirmPassword}
          onPressPasswordIcon={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
        />
      </Box>

      <Button
        hasBorder
        title="Confirm"
        isLoading={isPending}
        bg={theme.colors.PRIMARY_100}
        disabled={
          form.password &&
          form.confirmPassword &&
          form.oldPassword &&
          Object.keys(errors).length === 0
            ? false
            : true
        }
        onPress={handleChangeUserPassword}
      />

      <PasswordResetSuccess
        isVisible={open === 'password-reset'}
        onClose={onClose}
      />
    </Screen>
  );
};
