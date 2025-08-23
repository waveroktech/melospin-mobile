import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getConnectionRequests,
  getConnections,
  setHandleConnection,
  setSendConnection,
} from 'services/api/connect.service';

export const useGetConnections = () => {
  return useQuery({
    queryKey: ['get-melospin-connections'],
    queryFn: () => getConnections(),
    enabled: false,
  });
};

export const useGetConnectionRequests = () => {
  const {data, refetch} = useQuery({
    queryKey: ['get-melospin-connections-requests'],
    queryFn: () => getConnectionRequests(),
    enabled: false,
  });

  console.log(data, 'data');
  return {data, refetch};
};

export const useSetHandleConnection = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: setHandleConnection,
    onSuccess,
    onError,
  });
};

export const useSetSendConnection = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: setSendConnection,
    onSuccess,
    onError,
  });
};
