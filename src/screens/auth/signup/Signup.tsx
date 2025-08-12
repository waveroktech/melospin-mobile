import React, {useCallback, useState} from 'react';
import {Box, Button, FormInput} from 'design-system';
import {AvoidingView, Header, HeaderText, Icon, Loader, Screen} from 'shared';
import theme from 'theme';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'types';
import {ScrollView} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {hp, wp} from 'utils';
import {useCreateAccount} from 'store';
import {showMessage} from 'react-native-flash-message';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const Signup = () => {
  const {goBack, navigate} =
    useNavigation<NavigationProp<AuthStackParamList>>();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const {
    control,
    watch,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'all',
  });

  const form = watch();

  const {mutate: createAccount, isPending} = useCreateAccount({
    onSuccess: (data: any) => {
      console.log(data);
      if (data?.status === 'failed') {
        return showMessage({
          message: data?.message,
          type: 'danger',
          duration: 2000,
        });
      } else if (data?.status === 'pending') {
        return showMessage({
          message: data?.message,
          type: 'info',
          duration: 2000,
        });
      }
      showMessage({
        message: data.message,
        type: 'success',
        duration: 2000,
      });
      navigate('VerifyEmail', {email: form.email});
    },
  });

  const handleCreateAccount = useCallback(() => {
    createAccount({
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      firstName: form.firstName,
      lastName: form.lastName,
    });
  }, [createAccount, form]);
  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.PRIMARY}>
      <Header
        hasHeaderIcon
        hasGoForward="Log in"
        onPressRightIcon={() => goBack()}
      />

      <AvoidingView>
        <ScrollView>
          <HeaderText
            hasHeaderText="Sign Up"
            hasSubText="Create a new user account"
          />

          <Box mt={50} mx={16}>
            <FormInput
              label="Enter first name"
              autoCapitalize="none"
              control={control}
              name="firstName"
              errorText={errors.firstName?.message}
              value={form.firstName}
            />
            <FormInput
              keyboardType="email-address"
              label="Enter last name"
              autoCapitalize="none"
              control={control}
              name="lastName"
              errorText={errors.lastName?.message}
              value={form.lastName}
            />
            <FormInput
              keyboardType="email-address"
              label="Enter email address"
              autoCapitalize="none"
              control={control}
              name="email"
              errorText={errors.email?.message}
              value={form.email}
            />
            <FormInput
              label="Enter password here"
              autoCapitalize="none"
              control={control}
              name="password"
              isPassword
              errorText={errors.password?.message}
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
              errorText={errors.confirmPassword?.message}
              value={form.password}
              secureTextEntry={showConfirmPassword}
              onPressPasswordIcon={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            />
          </Box>
        </ScrollView>
      </AvoidingView>

      <Box
        position={'absolute'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        bottom={hp(40)}
        width={'90%'}
        alignSelf={'center'}>
        <Box
          flexDirection={'row'}
          width={wp(120)}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Box>
            <Icon name="google" />
          </Box>
          <Box>
            <Icon name="facebook" />
          </Box>
        </Box>
        <Button
          title="Sign up"
          hasBorder
          onPress={handleCreateAccount}
          bg={theme.colors.PRIMARY_100}
          isNotBottom
          disabled={
            form?.confirmPassword &&
            form?.email &&
            form?.lastName &&
            form?.firstName &&
            form?.password &&
            Object.keys(errors).length === 0
              ? false
              : true
          }
          width={wp(160)}
        />
      </Box>

      <Loader loading={isPending} />
    </Screen>
  );
};
