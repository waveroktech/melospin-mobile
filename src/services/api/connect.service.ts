import {get, post, put} from './melospin.service';

export const setSendConnection = async (payload: {targetUserId: string}) => {
  return post('connections', payload).then(data => data as any);
};

export const getConnectionRequests = async () => {
  return get('connections/requests').then(data => data as any);
};

export const setHandleConnection = async (payload: {
  status: string;
  targetUserId: string;
}) => {
  const dataPayload = {
    status: payload.status,
  };
  return put(`connections/${payload.targetUserId}`, dataPayload).then(
    data => data as any,
  );
};

export const getConnections = async () => {
  return get('connections').then(data => data as any);
};
