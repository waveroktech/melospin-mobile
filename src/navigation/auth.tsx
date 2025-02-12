import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Onboarding} from 'screens/auth';
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
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
