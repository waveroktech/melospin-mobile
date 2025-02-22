import {
  AccountProfileRequest,
  AccountSetupRequest,
  CreateAccountRequest,
  LoginRequest,
  SetPasswordResetRequest,
  VerifyAccountRequest,
} from 'interfaces';
import {post} from './melospin.service';

export const setCreateAccount = async (
  payload: CreateAccountRequest,
): Promise<any> => {
  return post('auth/sign-up', payload).then(data => data as any);
};

export const setLoginAccount = async (payload: LoginRequest): Promise<any> => {
  return post('auth/login', payload).then(data => data as any);
};

export const setAccount = async (
  payload: AccountSetupRequest,
): Promise<any> => {
  return post('auth/account-setup', payload).then(data => data as any);
};

export const setVerifyAccount = async (payload: VerifyAccountRequest) => {
  return post('auth/verify-account', payload).then(data => data as any);
};

export const setAccountProfile = async (payload: AccountProfileRequest) => {
  return post('auth/setup-account', payload).then(data => data as any);
};

export const setInitPasswordReset = async (payload: {email: string}) => {
  return post('auth/forgot-password', payload).then(data => data as any);
};

export const setVerifyPasswordReset = async (payload: VerifyAccountRequest) => {
  return post('auth/verify-reset-password', payload).then(data => data as any);
};

export const setNewPassword = async (payload: SetPasswordResetRequest) => {
  return post('auth/set-password', payload).then(data => data as any);
};
