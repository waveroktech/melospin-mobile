import {UserProfileUpdateRequest} from 'interfaces/services/user.interface';
import {put} from './melospin.service';

export const setUserProfileUpdate = async (
  payload: UserProfileUpdateRequest,
): Promise<any> => {
  return put(`users/${payload.user_id}`, payload).then(data => data as any);
};
