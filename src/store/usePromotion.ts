import {useMutation, useQuery} from '@tanstack/react-query';
import {
  approveDeclinePromoRequest,
  getPromotions,
  setCalculateBiddingSplit,
  setCalculatePromotionCost,
  setCreatePromotion,
  getPromotionPaymentSummary,
  getPromotionRequests,
  getPromotionTypes,
  uploadProofOfPlay,
} from 'services/api/promotion.service';

export const useUserPromotions = () => {
  return useQuery({
    queryKey: ['get-user-promotions'],
    queryFn: () => getPromotions(),
    enabled: false,
  });
};

export const useCalculatePromotionCost = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: setCalculatePromotionCost,
    onSuccess,
    onError,
  });
};

export const useCalculateBiddingSplit = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: setCalculateBiddingSplit,
    onSuccess,
    onError,
  });
};

export const useCreatePromotion = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: setCreatePromotion,
    onSuccess,
    onError,
  });
};

export const usePromotionPaymentSummary = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: getPromotionPaymentSummary,
    onSuccess,
    onError,
  });
};

export const useGetPromotionRequests = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['get-promotion-requests'],
    queryFn: () => getPromotionRequests(),
    enabled,
  });
};

export const useGetPromotionTypes = () => {
  return useQuery({
    queryKey: ['get-promotion-types'],
    queryFn: () => getPromotionTypes(),
    enabled: false,
  });
};

export const useApproveDeclinePromoRequest = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: ({
      requestId,
      status,
    }: {
      requestId: string;
      status: 'accepted' | 'declined';
    }) => approveDeclinePromoRequest(requestId, {status}),
    onSuccess,
    onError,
  });
};

export const useUploadProofOfPlay = ({
  onError,
  onSuccess,
}: {
  onError?: any;
  onSuccess?: any;
}) => {
  return useMutation({
    mutationFn: ({
      requestId,
      file,
    }: {
      requestId: string;
      file: {uri: string; type?: string; name?: string};
    }) => uploadProofOfPlay(requestId, file),
    onSuccess,
    onError,
  });
};
