import React, {useCallback} from 'react';
import {Box, Button, FormInput} from 'design-system';
import {Header, HeaderText, Loader, Screen} from 'shared';
import theme from 'theme';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {wp} from 'utils';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'types';
import {useInitPasswordReset} from 'store';
import {showMessage} from 'react-native-flash-message';

interface FormData {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export const ForgotPassword = () => {
  const {navigate} = useNavigation<NavigationProp<AuthStackParamList>>();

  const {
    control,
    watch,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
    mode: 'all',
  });

  const form = watch();

  const {mutate: initPasswordReset, isPending} = useInitPasswordReset({
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
        navigate('VerifyPasswordReset', {email: form.email});
        return showMessage({
          message: data?.message,
          type: 'success',
          duration: 2000,
        });
      }
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const handlePasswordReset = useCallback(() => {
    initPasswordReset({email: form.email});
  }, [form.email, initPasswordReset]);

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.PRIMARY}>
      <Header hasBackButton goBackText="Back to login" />

      <HeaderText
        hasHeaderText="Reset Password"
        hasSubText="Provide your email address to continue reset"
        width={wp(330)}
      />

      <Box mt={50} mx={16}>
        <FormInput
          keyboardType="email-address"
          label="Email Address"
          autoCapitalize="none"
          control={control}
          errorText={errors.email?.message}
          name="email"
          value={form.email}
        />
      </Box>

      <Button
        bg={theme.colors.PRIMARY_100}
        title="Send reset code"
        hasBorder
        disabled={
          form?.email && Object.keys(errors).length === 0 ? false : true
        }
        onPress={handlePasswordReset}
      />

      <Loader loading={isPending} />
    </Screen>
  );
};
