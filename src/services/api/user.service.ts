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
