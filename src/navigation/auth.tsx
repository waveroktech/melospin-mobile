import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
  ForgotPassword,
  Login,
  Onboarding,
  ResetPassword,
  SelectProfile,
  SetupProfile,
  Signup,
  VerifyEmail,
  VerifyPasswordReset,
} from 'screens/auth';
import {AuthStackParamList} from 'types';

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <AuthStack.Screen name="Onboarding" component={Onboarding} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
      <AuthStack.Screen name="VerifyEmail" component={VerifyEmail} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen
        name="VerifyPasswordReset"
        component={VerifyPasswordReset}
      />
      <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
      <AuthStack.Screen name="SelectProfile" component={SelectProfile} />
      <AuthStack.Screen name="SetupProfile" component={SetupProfile} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
