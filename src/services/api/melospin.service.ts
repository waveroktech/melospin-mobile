import {
  del as delConfig,
  get as getConfig,
  patch as patchConfig,
  post as postConfig,
  put as putConfig,
} from '../global.service';
import Config from 'react-native-config';

const MELOSPIN_ENDPOINT = Config.BASE_URL;

const defaultHeaders = {};

const getEndpoint = (endpoint: string, query?: Record<string, string>) => {
  if (query) {
    const queryString = new URLSearchParams(query).toString();
    return `${endpoint}?${queryString}`;
  }
  return endpoint;
};

export const get = async <T>(
  endpoint: string,
  data?: any,
  headers?: Record<string, string>,
  query?: Record<string, string>,
): Promise<T> => {
  return getConfig(
    getEndpoint(`${MELOSPIN_ENDPOINT}/${endpoint}`, query),
    data,
    {
      ...defaultHeaders,
      ...headers,
    },
  );
};

export const post = async <T>(
  endpoint: string,
  data?: any,
  headers?: Record<string, string>,
  query?: Record<string, string>,
): Promise<T> => {
  return postConfig(
    getEndpoint(`${MELOSPIN_ENDPOINT}/${endpoint}`, query),
    data,
    {
      ...defaultHeaders,
      ...headers,
    },
  );
};

export const put = async <T>(
  endpoint: string,
  data?: any,
  headers?: Record<string, string>,
  query?: Record<string, string>,
): Promise<T> => {
  return putConfig(
    getEndpoint(`${MELOSPIN_ENDPOINT}/${endpoint}`, query),
    data,
    {
      ...defaultHeaders,
      ...headers,
    },
  );
};

export const del = async <T>(
  endpoint: string,
  data?: any,
  query?: Record<string, string>,
  headers?: Record<string, string>,
): Promise<T> => {
  return delConfig(
    getEndpoint(`${MELOSPIN_ENDPOINT}/${endpoint}`, query),
    data,
    {
      ...defaultHeaders,
      ...headers,
    },
  );
};

export const patch = async <T>(
  endpoint: string,
  data?: any,
  headers?: Record<string, string>,
  query?: Record<string, string>,
): Promise<T> => {
  return patchConfig(
    getEndpoint(`${MELOSPIN_ENDPOINT}/${endpoint}`, query),
    data,
    {
      ...defaultHeaders,
      ...headers,
    },
  );
};
