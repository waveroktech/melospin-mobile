import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getPromotions,
  setCalculateBiddingSplit,
  setCalculatePromotionCost,
  setCreatePromotion,
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
