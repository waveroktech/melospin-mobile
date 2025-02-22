import {useQuery} from '@tanstack/react-query';
import {getGenres} from 'services/api/genre.service';

export const useGetGenre = () => {
  return useQuery({
    queryKey: ['get-melospin-genres'],
    queryFn: () => getGenres(),
    enabled: false,
  });
};
