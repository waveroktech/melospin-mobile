import {useMutation, useQuery} from '@tanstack/react-query';
import {getUserProfile, setUserProfileUpdate} from 'services/api/user.service';

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
