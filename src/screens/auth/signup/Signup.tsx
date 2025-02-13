import React, {useState} from 'react';
import {Box, Button, FormInput} from 'design-system';
import {AvoidingView, Header, HeaderText, Icon, Screen} from 'shared';
import theme from 'theme';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'types';
import {ScrollView} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {hp, wp} from 'utils';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
});

export const Signup = () => {
  const {goBack, navigate} =
    useNavigation<NavigationProp<AuthStackParamList>>();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const {control, watch} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const form = watch();
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
              value={form.firstName}
            />
            <FormInput
              keyboardType="email-address"
              label="Enter last name"
              autoCapitalize="none"
              control={control}
              name="lastName"
              value={form.lastName}
            />
            <FormInput
              keyboardType="email-address"
              label="Enter email address"
              autoCapitalize="none"
              control={control}
              name="email"
              value={form.email}
            />
            <FormInput
              label="Enter password here"
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
          onPress={() => navigate('VerifyEmail')}
          bg={theme.colors.PRIMARY_100}
          isNotBottom
          width={wp(160)}
        />
      </Box>
    </Screen>
  );
};
