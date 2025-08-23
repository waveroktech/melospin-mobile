import {useMelospinStore} from 'store';
import {del, get, post} from './melospin.service';

export const getDiscography = async () => {
  return get('discographs').then(data => data as any);
};

export const getSingleDiscography = async (payload: {discoId: string}) => {
  return get(`discographs/${payload?.discoId}`).then(data => data as any);
};

export const setAddDiscography = async (payload: any) => {
  const token = useMelospinStore.getState().authToken;
  console.log(token, 'token');
  console.log(payload, 'payload');
  return post('discographs', payload).then(data => data as any);
};

export const setDeleteDiscography = async (payload: {discoId: string[]}) => {
  return del('discographs', payload).then(data => data as any);
};
