import {useQuery} from '@tanstack/react-query';
import {getPromotions} from 'services/api/promotion.service';

export const useUserPromotions = () => {
  return useQuery({
    queryKey: ['get-user-promotions'],
    queryFn: () => getPromotions(),
    enabled: false,
  });
};
