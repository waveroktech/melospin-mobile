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
  userId?: string;
  data: {
    password: string;
    confirmPassword: string;
    currentPassword: string;
  };
}) => {
  return put(`users/${payload?.userId}/change-password`, payload?.data).then(
    data => data as any,
  );
};

export const updateUserPreferences = async (payload: {
  userId?: string;
  data: {
    hideAccountBalance: boolean;
    allowPushNotification: boolean;
    enableBioLogin: boolean;
  };
}) => {
  return put(`users/${payload?.userId}/preference`, payload?.data).then(
    data => data as any,
  );
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

export const submitKyc = async (payload: {
  userId: string;
  file: {uri: string; type?: string; name?: string};
  identificationType: string;
  identificationNumber: string;
  homeAddress: string;
  phoneNumber: string;
}): Promise<any> => {
  const formData = new FormData();
  formData.append('file', {
    uri: payload.file.uri,
    type: payload.file.type || 'image/png',
    name: payload.file.name || 'kyc-document.png',
  } as any);
  formData.append('identificationType', payload.identificationType);
  formData.append('identificationNumber', payload.identificationNumber);
  formData.append('homeAddress', payload.homeAddress);
  formData.append('phoneNumber', payload.phoneNumber);

  return put(`users/${payload.userId}/kyc`, formData).then(data => data as any);
};
