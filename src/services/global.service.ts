import {useMelospinStore} from 'store';

export const getDefaultHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const token = useMelospinStore.getState().authToken;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('Content-Type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    // if (isJson && data.errors !== null) {
    //   throw new Error(JSON.stringify(data.errors));
    // }
    console.log(response);
    if (response.status === 401) {
      // toast(data.message, {type: 'error'});
      // Cookies.remove('token');
      // Cookies.remove('refreshToken');
      useMelospinStore.getState().setIsLoggedIn(false);
      useMelospinStore.getState().setAuthToken('');
    }

    // throw new Error(data.message || response.statusText);
  }
  return data as T;
}

export const cleanData = (data: {[key: string]: any} | undefined): any => {
  if (!Object.keys(data || {}).length) {
    return data;
  }

  const newData = {} as {[key: string]: any};

  for (const key in data) {
    if (
      data.hasOwnProperty(key) &&
      !['', null, undefined, 0, 'Any'].includes(data[key])
    ) {
      newData[key] = data[key];
    }
  }

  return newData;
};

// Utility function for making GET requests
export const get = async <T>(
  endpoint: string,
  data?: any,
  headers?: Record<string, string>,
): Promise<T> => {
  try {
    const response = await fetch(endpoint, {
      headers: {...getDefaultHeaders(), ...headers},
      body: JSON.stringify(cleanData(data)),
    });
    return handleResponse(response) as T;
  } catch (error) {
    // Handle network or other errors here
    console.error('An error occurred:', error, endpoint);

    return {
      error: 'An error occurred while making the request.',
    } as T;
  }
};

// Utility function for making POST requests
export const post = async <T>(
  endpoint: string,
  data?: any,
  headers?: Record<string, string>,
): Promise<T> => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {...getDefaultHeaders(), ...headers},
      body: JSON.stringify(cleanData(data)),
    });
    return handleResponse(response) as T;
  } catch (error) {
    // Handle network or other errors here
    console.error('An error occurred:', error, endpoint);
    return {
      error: 'An error occurred while making the request.',
    } as T;
  }
};

export const patch = async <T>(
  endpoint: string,
  data?: any,
  headers?: Record<string, string>,
): Promise<T> => {
  try {
    const response = await fetch(endpoint, {
      method: 'PATCH',
      headers: {...getDefaultHeaders(), ...headers},
      body: JSON.stringify(cleanData(data)),
    });
    return handleResponse(response) as T;
  } catch (error) {
    // Handle network or other errors here
    console.error('An error occurred:', error, endpoint);
    return {
      error: 'An error occurred while making the request.',
    } as T;
  }
};

// Utility function for making PUT requests
export const put = async <T>(
  endpoint: string,
  data: any,
  headers?: Record<string, string>,
): Promise<T> => {
  try {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {...getDefaultHeaders(), ...headers},
      body: JSON.stringify(cleanData(data)),
    });
    return handleResponse(response) as T;
  } catch (error) {
    // Handle network or other errors here
    console.error('An error occurred:', error, endpoint);
    return {
      error: 'An error occurred while making the request.',
    } as T;
  }
};

// Utility function for making DELETE requests
export const del = async <T>(
  endpoint: string,
  data: any,
  headers?: Record<string, string>,
): Promise<T> => {
  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {...getDefaultHeaders(), ...headers},
    });
    return handleResponse(response) as T;
  } catch (error) {
    // Handle network or other errors here
    console.error('An error occurred:', error, endpoint);
    return {
      error: 'An error occurred while making the request.',
    } as T;
  }
};
