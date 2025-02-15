import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  DashboardStack: NavigatorScreenParams<DashboardStackParamList>;
};

export type AuthStackParamList = {
  Onboarding: undefined;
  Signup: undefined;
  Login: undefined;
  VerifyEmail: undefined;
  ForgotPassword: undefined;
  VerifyPasswordReset: undefined;
  ResetPassword: undefined;
  SelectProfile: undefined;
  SetupProfile: undefined;
};

export type BottomTabStackParamList = {
  Home: undefined;
  Discography: undefined;
  Promotions: undefined;
  Explore: undefined;
};

export type DashboardStackParamList = {
  Dashboard: BottomTabStackParamList;
  Profile: undefined;
  AddPromotion: undefined;
};
