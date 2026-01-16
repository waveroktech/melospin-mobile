import {ApiResponseSingular} from './response.singular.interface';

export interface CreateAccountRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AccountSetupRequest {
  userType: string;
  instagram: string;
  tictok: string;
  brandName: string;
  musicGenres: string[];
}

export interface VerifyAccountRequest {
  otpEmail?: string;
  otp: string;
}

export interface ResendOtpRequest {
  email?: string;
  useCase: 'verify_account' | 'reset_password';
}

export interface AccountProfileRequest {
  userType: string;
  instagram: string;
  tictok: string;
  brandName: string;
  musicGenres: string[];
  promotionTypes?: string[];
  playSpot?: string;
  playSpotAddress?: string;
  address?: {
    country: string;
    state: string;
  };
}

export interface SetPasswordResetRequest {
  resetToken: string;
  identifier: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponseData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  tictok: string | null;
  instagram: string | null;
  profileUrl: string | null;
  brandName: string | null;
  currentUserType: string | null;
  musicGenres: string[];
  completionPercent: string;
  isProfileCompleted: boolean;
  token: string;
  connectCount: number;
  dateJoined: string;
  totalPromotions: number;
  totalConnections: number;
  connectionRequestCount: number;
  connectedUsers: Array<{
    status: string;
    isMutual: boolean;
    createdAt: string;
    mutualDate: string;
    connectRecipientInfo: {
      firstName: string;
      lastName: string;
      currentUserType: string;
      connectUserId: string;
      profileUrl: string;
    };
    connectSenderInfo: {
      firstName: string;
      lastName: string;
      currentUserType: string;
      connectUserId: string;
      profileUrl: string;
    };
    connectionId: string;
    role: string;
  }>;
  recentUploads: any[];
  uploadsCount: number;
  snapchat: string | null;
  address: {
    country: string;
    state: string;
  } | null;
  promotionTypes: string[];
  playSpot: string | null;
  playSpotAddress: string | null;
  kycStatus?: 'pending' | 'approved' | 'rejected' | null;
}

export interface LoginResponse extends ApiResponseSingular<LoginResponseData> {}
