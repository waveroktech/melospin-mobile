import {useInfiniteQuery, InfiniteData} from '@tanstack/react-query';
import {
  getNotifications,
  NotificationResponse,
} from 'services/api/notification.service';

export const useGetNotifications = (perPage: number = 25) => {
  return useInfiniteQuery<
    NotificationResponse,
    Error,
    InfiniteData<NotificationResponse>,
    string[],
    number
  >({
    queryKey: ['get-notifications', perPage.toString()],
    queryFn: ({pageParam}) => getNotifications(pageParam as number, perPage),
    getNextPageParam: lastPage => {
      const {pagination} = lastPage;
      // Return next page if it exists, otherwise undefined to stop pagination
      return pagination.nextPage ?? undefined;
    },
    getPreviousPageParam: firstPage => {
      const {pagination} = firstPage;
      // Return previous page if it exists
      return pagination.prevPage ?? undefined;
    },
    initialPageParam: 1,
    enabled: false,
  });
};
