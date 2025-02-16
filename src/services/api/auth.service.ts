import {
  AccountSetupRequest,
  CreateAccountRequest,
  LoginRequest,
  VerifyAccountRequest,
} from 'interfaces';
import {post} from './melospin.service';

export const setCreateAccount = async (
  payload: CreateAccountRequest,
): Promise<any> => {
  return post('auth/sign-up', payload).then(data => data as any);
};

export const setLoginAccount = async (payload: LoginRequest): Promise<any> => {
  post('auth/login', payload).then(data => data as any);
};

export const setAccount = async (
  payload: AccountSetupRequest,
): Promise<any> => {
  return post('auth/account-setup', payload).then(data => data as any);
};

export const setVerifyAccount = async (payload: VerifyAccountRequest) => {
  return post('auth/verify-account', payload).then(data => data as any);
};
