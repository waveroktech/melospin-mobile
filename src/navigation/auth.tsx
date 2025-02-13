import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Login, Onboarding, Signup, VerifyEmail} from 'screens/auth';
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
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
