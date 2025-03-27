/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import theme from 'theme';
import {fontSz, hp, wp} from 'utils';
import {StyleSheet} from 'react-native';
import {Box, Text} from 'design-system';
import {BottomTabStackParamList} from 'types';
import {Icon} from 'shared';
import {Discography, Explore, Home, Promotions} from 'screens/dashboard';

const DashboardBottomTabs = createBottomTabNavigator<BottomTabStackParamList>();

interface BottomTabProps {
  name: string;
  focused: boolean;
}

const BottomTab = ({name, focused}: BottomTabProps) => {
  const icon = name?.toLowerCase();
  return (
    <Box key={name} style={styles.tabContainer}>
      <Icon name={focused ? `active-${icon}` : icon} />
      <Text
        mt={2}
        variant={focused ? 'bodyBold' : 'body'}
        fontSize={fontSz(13)}
        color={focused ? theme.colors.LIGHT_PRIMARY : theme.colors.GREY}>
        {name}
      </Text>
    </Box>
  );
};

const BottomTabBar = () => {
  return (
    <DashboardBottomTabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: hp(90),
          backgroundColor: theme.colors.BOTTOM_TAB_BG,
          borderTopWidth: 0,
          position: 'absolute',
          bottom: hp(20),
          borderRadius: hp(24),
          marginHorizontal: wp(16),
        },
        tabBarShowLabel: false,
      }}>
      <DashboardBottomTabs.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <BottomTab name="Home" focused={focused} />
          ),
        }}
      />
      <DashboardBottomTabs.Screen
        name="Promotions"
        component={Promotions}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <BottomTab name="Promotions" focused={focused} />
          ),
        }}
      />
      <DashboardBottomTabs.Screen
        name="Explore"
        component={Explore}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <BottomTab name="Explore" focused={focused} />
          ),
        }}
      />
      <DashboardBottomTabs.Screen
        name="Discography"
        component={Discography}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <BottomTab name="Discography" focused={focused} />
          ),
        }}
      />
    </DashboardBottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTabButton: {
    width: 24,
    height: 24,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: hp(1),
  },
  tabContainer: {
    width: wp(80),
    height: hp(95),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(50),
  },
  receiveText: {
    textAlign: 'center',
  },
});

export default BottomTabBar;
