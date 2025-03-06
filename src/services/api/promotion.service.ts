import {get, post} from './melospin.service';

export const getPromotions = async (): Promise<any> => {
  return get('promotions').then(data => data as any);
};

export const setCalculatePromotionCost = async (payload: any) => {
  return post('promotions/calculate-cost', payload).then(data => data as any);
};

export const setCalculateBiddingSplit = async (payload: any) => {
  console.log(payload);
  return post('promotions/calculate-bidding-split', payload).then(
    data => data as any,
  );
};
