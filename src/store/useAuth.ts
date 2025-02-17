import {useMutation} from '@tanstack/react-query';
import {
  setAccount,
  setCreateAccount,
  setLoginAccount,
  setVerifyAccount,
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
