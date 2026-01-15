import {get, post, put} from './melospin.service';
import {
  ApproveDeclinePromoRequestPayload,
  CreatePromotionPayload,
  PromotionPaymentSummaryPayload,
  PromoRequestsResponse,
} from 'interfaces/services';

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

export const setCreatePromotion = async (payload: CreatePromotionPayload) => {
  return post('promotions', payload).then(data => data as any);
};

export const getPromotionPaymentSummary = async (
  payload: PromotionPaymentSummaryPayload,
) => {
  return post('promotions/payment-summary', payload).then(data => data as any);
};

export const getPromotionRequests = async (
  page: number = 1,
): Promise<PromoRequestsResponse> => {
  return get(`promotions/requests?page=${page}`).then(
    data => data as PromoRequestsResponse,
  );
};

export const getPromotion = async (promotionId: string): Promise<any> => {
  return get(`promotions/${promotionId}`).then(data => data as any);
};

export const getPromotionTypes = async (): Promise<any> => {
  return get('promotion-types').then(data => data as any);
};

export const approveDeclinePromoRequest = async (
  requestId: string,
  payload: ApproveDeclinePromoRequestPayload,
): Promise<any> => {
  return put(`promotions/requests/${requestId}`, payload).then(
    data => data as any,
  );
};

export const uploadProofOfPlay = async (
  requestId: string,
  file: {uri: string; type?: string; name?: string},
): Promise<any> => {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    type: file.type || 'video/mp4',
    name: file.name || 'proof-of-play.mp4',
  } as any);

  return put(`promotions/requests/${requestId}/proof-of-play`, formData).then(
    data => data as any,
  );
};
