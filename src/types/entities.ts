import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
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
