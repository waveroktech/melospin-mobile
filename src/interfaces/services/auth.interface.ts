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
