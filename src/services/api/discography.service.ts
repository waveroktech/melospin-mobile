import {get, post} from './melospin.service';

export const getDiscography = async () => {
  return get('discographs').then(data => data as any);
};

export const getSingleDiscography = async (payload: {discoId: string}) => {
  return get(`discographs/${payload?.discoId}`).then(data => data as any);
};

export const setAddDiscography = async (payload: any) => {
  return post('discographs', payload, {
    'Content-Type': 'multipart/form-data;',
  }).then(data => data as any);
};
