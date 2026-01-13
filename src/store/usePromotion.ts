import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getPromotions,
  setCalculateBiddingSplit,
  setCalculatePromotionCost,
  setCreatePromotion,
  getPromotionRequests,
  getPromotionTypes,
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

export const useGetPromotionRequests = () => {
  return useQuery({
    queryKey: ['get-promotion-requests'],
    queryFn: () => getPromotionRequests(),
    enabled: false,
  });
};

export const useGetPromotionTypes = () => {
  return useQuery({
    queryKey: ['get-promotion-types'],
    queryFn: () => getPromotionTypes(),
    enabled: false,
  });
};
