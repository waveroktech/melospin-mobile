import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getDiscography,
  getSingleDiscography,
  setAddDiscography,
  setDeleteDiscography,
} from 'services/api/discography.service';

export const useGetDiscography = () => {
  return useQuery({
    queryKey: ['get-melospin-discography'],
    queryFn: () => getDiscography(),
    enabled: false,
  });
};

export const useGetSingleDiscography = (payload: {discoId: string}) => {
  return useQuery({
    queryKey: ['get-melospin-single-discography'],
    queryFn: () => getSingleDiscography(payload),
    enabled: false,
  });
};

export const useAddDiscography = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: setAddDiscography,
    onSuccess,
    onError,
  });
};

export const useDeleteDiscography = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: setDeleteDiscography,
    onSuccess,
    onError,
  });
};
