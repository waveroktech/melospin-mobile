import {ThemeProvider} from '@emotion/react';
import Navigation from './navigation';
import React, {useEffect} from 'react';
import theme from 'theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {FlashMessageToast} from 'shared';

const App = () => {
  useEffect(() => {
    // setTimeout(() => {
    //   SplashScreen.hide();
    // }, 2000);
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Navigation />
        <FlashMessageToast />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
