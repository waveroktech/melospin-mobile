import {get} from './melospin.service';

export interface NotificationMeta {
  recipientEmail: string;
  recipientId: string;
  title: string;
  senderEmail: string;
  content: string;
  channel: string;
  template: string;
}

export interface Notification {
  _id: string;
  recipientId: string;
  recipientEmail: string;
  senderEmail: string;
  title: string;
  channel: string;
  status: string;
  template: string;
  meta: NotificationMeta;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface NotificationPagination {
  prevPage: number | null;
  nextPage: number | null;
  perPage: number;
  offset: number;
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface NotificationResponse {
  status: 'success' | 'failed';
  data: Notification[];
  message: string;
  code: string;
  pagination: NotificationPagination;
}

export const getNotifications = async (
  page: number = 1,
  perPage: number = 25,
): Promise<NotificationResponse> => {
  return get('notifications', undefined, undefined, {
    page: page.toString(),
    perPage: perPage.toString(),
  }).then(data => data as NotificationResponse);
};
