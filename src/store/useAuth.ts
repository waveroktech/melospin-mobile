import {useMutation} from '@tanstack/react-query';
import {
  setAccount,
  setAccountProfile,
  setCreateAccount,
  setInitPasswordReset,
  setLoginAccount,
  setNewPassword,
  setResendOtp,
  setVerifyAccount,
  setVerifyPasswordReset,
} from 'services/api/auth.service';

export const useCreateAccount = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: setCreateAccount,
    onSuccess,
    onError,
  });
};

export const useLogin = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: setLoginAccount,
    onSuccess,
    onError,
  });
};

export const useSetAccount = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: setAccount,
    onSuccess,
    onError,
  });
};

export const useSetVerifyAccount = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: setVerifyAccount,
    onSuccess,
    onError,
  });
};

export const useResendOtp = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: setResendOtp,
    onSuccess,
    onError,
  });
};

export const useSetAccountProfile = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: setAccountProfile,
    onSuccess,
    onError,
  });
};

export const useInitPasswordReset = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: setInitPasswordReset,
    onSuccess,
    onError,
  });
};

export const useVerifyPasswordReset = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: setVerifyPasswordReset,
    onSuccess,
    onError,
  });
};

export const usePasswordReset = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: setNewPassword,
    onSuccess,
    onError,
  });
};
