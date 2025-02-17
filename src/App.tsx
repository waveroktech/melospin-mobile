import {ThemeProvider} from '@emotion/react';
import Navigation from './navigation';
import React, {useEffect} from 'react';
import theme from 'theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {FlashMessageToast} from 'shared';
import {ApiProvider} from 'services/api';

const App = () => {
  useEffect(() => {
    // setTimeout(() => {
    //   SplashScreen.hide();
    // }, 2000);
  }, []);

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
