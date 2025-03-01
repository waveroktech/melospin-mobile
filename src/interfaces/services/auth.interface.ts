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

export interface AccountProfileRequest {
  userType: string;
  instagram: string;
  tictok: string;
  brandName: string;
  musicGenres: string[];
}

export interface SetPasswordResetRequest {
  resetToken: string;
  identifier: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponseData {
  brandName: string;
  completionPercent: string;
  connectCount: number;
  connectedUsers: any[];
  currentUserType: string;
  dateJoined: string;
  email: string;
  firstName: string;
  instagram: string;
  isProfileCompleted: true;
  lastName: string;
  musicGenres: string[];
  profileUrl: string | null;
  recentUploads: any[];
  tictok: string;
  token: string;
  totalConnections: number;
  totalPromotions: number;
  userId: string;
}

export interface LoginResponse extends ApiResponseSingular<LoginResponseData> {}
