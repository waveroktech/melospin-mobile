import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

import BottomTabBar from './bottom-tab';
import React from 'react';
import {DashboardStackParamList} from 'types';
import {
  AddDjs,
  AddPromotion,
  Profile,
  PromotionBudget,
} from 'screens/dashboard';

const DashboardStack = createStackNavigator<DashboardStackParamList>();

const DashboardNavigation = () => {
  return (
    <DashboardStack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <DashboardStack.Screen name="Dashboard" component={BottomTabBar} />
      <DashboardStack.Screen name="Profile" component={Profile} />
      <DashboardStack.Screen name="AddPromotion" component={AddPromotion} />
      <DashboardStack.Screen name="AddDjs" component={AddDjs} />
      <DashboardStack.Screen
        name="PromotionBudget"
        component={PromotionBudget}
      />
    </DashboardStack.Navigator>
  );
};

export default DashboardNavigation;
