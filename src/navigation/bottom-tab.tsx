/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import theme from 'theme';
import {hp, isIos, wp} from 'utils';
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
      <Icon name={icon} />
      <Text
        mt={2}
        variant={focused ? 'bodyBold' : 'body'}
        color={focused ? theme.colors.PRIMARY : theme.colors.GREY}>
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
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: theme.colors.WHITE,
        tabBarLabelStyle: {
          fontSize: hp(10),
          fontFamily: theme.font.AvenirNextRegular,
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
        name="Discography"
        component={Discography}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <BottomTab name="Explore" focused={focused} />
          ),
        }}
      />
      <DashboardBottomTabs.Screen
        name="Explore"
        component={Explore}
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
  receiveButtonContainer: {
    alignItems: 'center',
    top: isIos ? 10 : 0,
  },
  tabContainer: {
    width: wp(90),
    height: hp(95),
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiveText: {
    textAlign: 'center',
  },
  tabBarStyle: {
    height: hp(95),
    backgroundColor: theme.colors.BASE_SECONDARY,
    width: wp(351),
    right: wp(10),
    position: 'absolute',
    bottom: hp(20),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: hp(24),
    marginLeft: wp(21),
  },
});

export default BottomTabBar;
