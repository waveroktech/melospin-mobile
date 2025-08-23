import {UserProfileUpdateRequest} from 'interfaces/services/user.interface';
import {get, put} from './melospin.service';

export const setUserProfileUpdate = async (
  payload: UserProfileUpdateRequest,
): Promise<any> => {
  const {user_id, ...newPayload} = payload;
  return put(`users/${user_id}`, newPayload).then(data => data as any);
};

export const getUserProfile = async (payload: {userId?: string}) => {
  return get(`users/${payload?.userId}`).then(data => data as any);
};

export const getDJs = async () => {
  return get('users?userType=dj&limit=100').then(data => data as any);
};

export const changeUserPassword = async (payload: {
  userId: string;
  oldPassword: string;
  newPassword: string;
}) => {
  return put(`users/${payload?.userId}/change-password`, payload).then(
    data => data as any,
  );
};

export const updateUserPreferences = async (payload: {
  hideAccountBalance: boolean;
  allowPushNotification: boolean;
  enableBioLogin: boolean;
}) => {
  return put('users/dj/preferences', payload).then(data => data as any);
};

export const updateBookingRate = async (payload: {
  userId?: string;
  chargePerPlay: number;
}) => {
  return put(`users/${payload?.userId}/booking-rate`, payload).then(
    data => data as any,
  );
};

export const getBankList = async () => {
  return get('payments/banks').then(data => data as any);
};

export const updateUserBankDetails = async (payload: {
  userId?: string;
  data: {
    bankCode: string;
    processor: string;
    accountNumber: string;
    password: string;
    bvn: string;
  };
}) => {
  return put(`users/${payload?.userId}/banks`, payload?.data).then(
    data => data as any,
  );
};

export const updateUserPlaySessions = async (payload: {
  userId?: string;
  data: {
    playingDays: string[];
  };
}) => {
  console.log(payload, 'payload');
  return put(`users/${payload?.userId}/playing-days`, payload?.data).then(
    data => data as any,
  );
};
