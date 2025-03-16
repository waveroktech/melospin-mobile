import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  DashboardStack: NavigatorScreenParams<DashboardStackParamList>;
};

export type AuthStackParamList = {
  Onboarding: undefined;
  Signup: undefined;
  Login: undefined;
  VerifyEmail: {email?: string};
  ForgotPassword: undefined;
  VerifyPasswordReset: {email: string};
  ResetPassword: {
    data: {
      identifier: string;
      message: string;
      resetToken: string;
    };
  };
  SelectProfile: undefined;
  SetupProfile: {accountType: 'artiste' | 'dj'};
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
  AddDjs: {
    data: {
      discographyId: string;
      promotionLink?: string;
      externalLinks?: UploadFileLink[];
    };
  };
  PromotionBudget: {
    payload: {
      activePromoters: any[];
      discographyId: string;
      promotionLink?: string;
      externalLinks?: UploadFileLink[];
    };
  };
  PromotionCheckout: {
    data: any;
  };
  MelospinWebview?: {url?: string};
  Settings: undefined;
  ChangePassword: undefined;
};

interface UploadFileLink {
  name?: string;
  link?: string;
}
