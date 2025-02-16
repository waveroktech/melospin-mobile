import React from 'react';
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {AppStateStatus} from 'react-native';
import {isWeb} from 'utils';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchOnReconnect: 'always',
      // retry: 3,
      // staleTime: Infinity,
      // refetchOnWindowFocus: true,
      // gcTime: 1000 * 60 * 60 * 24, // 24 hours
      // throwOnError: true,
      networkMode: 'online',
      gcTime: 1000 * 60 * 60 * 24,
      staleTime: 2000,
      retry: 0,
      // onError: (error) => handleError(error),
    },
  },
});

export function onAppStateChange(status: AppStateStatus) {
  if (!isWeb) {
    focusManager.setFocused(status === 'active');
  }
}

export function ApiProvider({children}: {children: React.ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
