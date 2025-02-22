import {get} from './melospin.service';

export const getGenres = async (): Promise<any> => {
  return get('music-genres').then(data => data as any);
};
