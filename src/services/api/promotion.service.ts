import {get} from './melospin.service';

export const getPromotions = async (): Promise<any> => {
  return get('promotions').then(data => data as any);
};
