import React, {useState} from 'react';
import {Header, HeaderText, Icon, Screen} from 'shared';
import theme from 'theme';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'types';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {Box, Button, FormInput} from 'design-system';
import {hp, wp} from 'utils';
import {TouchableOpacity} from 'react-native';
import {showMessage} from 'react-native-flash-message';

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const Login = () => {
  const {navigate} = useNavigation<NavigationProp<AuthStackParamList>>();
  const [showPassword, setShowPassword] = useState(true);

  const {control, watch} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const form = watch();

  const login = async () => {
    showMessage({
      message: 'Passwords do not match. Kindly check again.',
      type: 'danger',
      duration: 2000,
    });
  };

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.PRIMARY}>
      <Header
        hasHeaderIcon
        hasGoForward="Sign up"
        onPressRightIcon={() => navigate('Signup')}
      />
      <HeaderText
        hasHeaderText="Login"
        hasSubText="Welcome back, log in to continue"
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
        <FormInput
          label="Password"
          autoCapitalize="none"
          control={control}
          name="password"
          isPassword
          value={form.password}
          secureTextEntry={showPassword}
          onPressPasswordIcon={() => setShowPassword(!showPassword)}
        />
      </Box>

      <Box
        position={'absolute'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        bottom={hp(40)}
        alignSelf={'center'}>
        <Box
          width={wp(160)}
          as={TouchableOpacity}
          activeOpacity={0.8}
          onPress={() => navigate('ForgotPassword')}
          height={hp(56)}
          justifyContent={'center'}>
          <Icon name="arrow-right-up" />
        </Box>

        <Button
          title="Log in"
          hasBorder
          onPress={login}
          bg={theme.colors.PRIMARY_100}
          isNotBottom
          width={wp(160)}
        />
      </Box>
    </Screen>
  );
};
