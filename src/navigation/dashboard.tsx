import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

import BottomTabBar from './bottom-tab';
import React from 'react';
import {DashboardStackParamList} from 'types';

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
    </DashboardStack.Navigator>
  );
};

export default DashboardNavigation;
