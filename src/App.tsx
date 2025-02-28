import {ThemeProvider} from '@emotion/react';
import Navigation from './navigation';
import React from 'react';
import theme from 'theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {FlashMessageToast} from 'shared';
import {ApiProvider} from 'services/api';
import {hideSplash, showSplash} from 'react-native-splash-view';

const App = () => {
  showSplash(); // Show the splash screen

  setTimeout(() => {
    hideSplash(); // Hide after some time
  }, 3000);

  return (
    <SafeAreaProvider>
      <ApiProvider>
        <ThemeProvider theme={theme}>
          <Navigation />
          <FlashMessageToast />
        </ThemeProvider>
      </ApiProvider>
    </SafeAreaProvider>
  );
};

export default App;
