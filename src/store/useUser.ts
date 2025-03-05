import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getDJs,
  getUserProfile,
  setUserProfileUpdate,
} from 'services/api/user.service';

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
  return useQuery({
    queryKey: ['get-user-profile'],
    queryFn: () => getUserProfile(payload),
    enabled: false,
  });
};

export const useGetDjs = () => {
  return useQuery({
    queryKey: ['get-djs'],
    queryFn: () => getDJs(),
    enabled: false,
  });
};
