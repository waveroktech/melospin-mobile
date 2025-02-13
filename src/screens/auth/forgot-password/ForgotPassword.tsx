import React from 'react';
import {Box, Button, FormInput} from 'design-system';
import {Header, HeaderText, Screen} from 'shared';
import theme from 'theme';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {wp} from 'utils';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'types';

interface FormData {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export const ForgotPassword = () => {
  const {navigate} = useNavigation<NavigationProp<AuthStackParamList>>();

  const {control, watch} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
    mode: 'all',
  });

  const form = watch();

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
          name="email"
          value={form.email}
        />
      </Box>

      <Button
        bg={theme.colors.PRIMARY_100}
        title="Send reset code"
        hasBorder
        onPress={() => navigate('VerifyPasswordReset')}
      />
    </Screen>
  );
};
