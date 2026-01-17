import {useMutation, useQuery} from '@tanstack/react-query';
import {
  changeUserPassword,
  getBankList,
  getDJs,
  getUserProfile,
  setUserProfileUpdate,
  submitKyc,
  updateBookingRate,
  updateUserBankDetails,
  updateUserPlaySessions,
  updateUserPreferences,
  uploadProfileImage,
} from 'services/api/user.service';
import {useMelospinStore} from './useStore';
import {useEffect} from 'react';

export const useUserProfileUpdate = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: setUserProfileUpdate,
    onSuccess,
    onError,
  });
};

export const useGetUserProfile = (payload: {userId?: string}) => {
  const {setUserInfo} = useMelospinStore();
  const data = useQuery({
    queryKey: ['get-user-profile'],
    queryFn: () => getUserProfile(payload),
    enabled: !!payload?.userId,
  });

  useEffect(() => {
    if (data?.data) {
      setUserInfo(data?.data?.data);
    }
  }, [data?.data, setUserInfo]);

  return data;
};

export const useGetDjs = () => {
  return useQuery({
    queryKey: ['get-djs'],
    queryFn: () => getDJs(),
    enabled: false,
  });
};

export const useChangeUserPassword = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: changeUserPassword,
    onSuccess,
    onError,
  });
};

export const useUpdateUserPreferences = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: updateUserPreferences,
    onSuccess,
    onError,
  });
};

export const useUpdateBookingRate = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: updateBookingRate,
    onSuccess,
    onError,
  });
};

export const useGetBankList = () => {
  const {setBankList} = useMelospinStore();
  const {data} = useQuery({
    queryKey: ['get-bank-list'],
    queryFn: () => getBankList(),
  });

  useEffect(() => {
    if (data?.data) {
      setBankList(data?.data);
    }
  }, [data?.data, setBankList]);
};

export const useUpdateUserBankDetails = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: updateUserBankDetails,
    onSuccess,
    onError,
  });
};

export const useUpdateUserPlaySessions = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: updateUserPlaySessions,
    onSuccess,
    onError,
  });
};

export const useSubmitKyc = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: submitKyc,
    onSuccess,
    onError,
  });
};

export const useUploadProfileImage = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: uploadProfileImage,
    onSuccess,
    onError,
  });
};
