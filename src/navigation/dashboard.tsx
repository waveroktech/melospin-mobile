import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

import BottomTabBar from './bottom-tab';
import React from 'react';
import {DashboardStackParamList} from 'types';
import {
  AddDjs,
  AddPromotion,
  ChangePassword,
  ConnectDj,
  DJProfile,
  Profile,
  PromotionBudget,
  PromotionCheckout,
  Settings,
  Notifications,
} from 'screens/dashboard';
import {MelospinWebView} from 'shared/MelospinWebview';

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
      <DashboardStack.Screen
        name="PromotionCheckout"
        component={PromotionCheckout}
      />
      <DashboardStack.Screen
        name="MelospinWebview"
        component={MelospinWebView}
      />
      <DashboardStack.Screen name="Settings" component={Settings} />
      <DashboardStack.Screen name="ChangePassword" component={ChangePassword} />
      <DashboardStack.Screen name="DJProfile" component={DJProfile} />
      <DashboardStack.Screen name="ConnectDJ" component={ConnectDj} />
      <DashboardStack.Screen name="Notifications" component={Notifications} />
    </DashboardStack.Navigator>
  );
};

export default DashboardNavigation;
