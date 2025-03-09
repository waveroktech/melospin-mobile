/* eslint-disable @typescript-eslint/no-shadow */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {formatTitleUrl, hp, queryToObject, wp} from 'utils';

import {WebView} from 'react-native-webview';
import {useRoute} from '@react-navigation/native';
import {Screen} from 'shared/Screen';
import {Text} from 'design-system';
import {Icon} from 'shared/Icon';
import theme from 'theme';
import {Loader} from 'shared/Loader';

export const MelospinWebView = ({navigation}: any) => {
  const params: any = useRoute().params;

  // const type = params?.

  const url = params?.url;
  const type = params?.type;

  console.log(url, '"https://checkout.paystack.com/kus4asrv2dene60"');

  const browserRef = useRef<WebView>(null);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [urlText, setUrlText] = useState(url);
  const [title, setTitle] = useState('');
  const [titleUrl, setTitleUrl] = useState('');
  const [canGoForward, setCanGoForward] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [incognito, setIncognito] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (verifying) {
        transactionSuccess();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [transactionSuccess, verifying]);

  useEffect(() => {
    loadURL(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // functions to search using different engines
  const searchEngines: any = {
    google: (uri: string) => `https://www.google.com/search?q=${uri}`,
    duckduckgo: (uri: string) => `https://duckduckgo.com/?q=${uri}`,
    bing: (uri: string) => `https://www.bing.com/search?q=${uri}`,
  };

  // javascript to inject into the window
  const injectedJavaScript = `
        window.ReactNativeWebView.postMessage('injected javascript works!');
        true; // note: this is required, or you'll sometimes get silent failures
    `;

  // change configurations so the user can
  // better control the browser
  const [config, setConfig] = useState({
    detectorTypes: 'all',
    allowStorage: true,
    allowJavascript: true,
    allowCookies: true,
    allowLocation: true,
    allowCaching: true,
    defaultSearchEngine: 'google',
  });

  // get the configuration, this allows us to change
  // configurations for incognito mode

  const getconfig = () => {
    if (incognito) {
      return {
        ...config,
        allowStorage: false,
        allowCookies: false,
        allowLocation: false,
        allowCaching: false,
      };
    }
    return config;
  };

  // toggle incognito mode
  const toggleIncognito = () => {
    setIncognito(incognito => !incognito);
    reload();
  };

  // load the url from the text input
  const loadURL = (url: string) => {
    const {defaultSearchEngine} = config;
    const newURL = upgradeURL(url, defaultSearchEngine);
    setCurrentUrl(newURL);
    setUrlText(newURL);
    // Keyboard.dismiss();
  };

  // upgrade the url to make it easier for the user:
  // https://www.facebook.com => https://www.facebook.com
  // facebook.com => https://www.facebook.com
  // facebook => https://www.google.com/search?q=facebook
  function upgradeURL(uri: string, searchEngine = 'google') {
    const isURL = uri?.split(' ').length === 1 && uri?.includes('.');
    if (isURL) {
      if (uri.startsWith('app')) {
        return 'https://' + uri;
      }
      if (uri.startsWith('portal')) {
        return 'https://' + uri;
      }
      if (uri.startsWith('www')) {
        return 'https://' + uri;
      }
      if (!uri.startsWith('http')) {
        return 'https://www.' + uri;
      }
      return uri;
    }
    // search for the text in the search engine
    const encodedURI = encodeURI(uri);
    return searchEngines?.[searchEngine](encodedURI);
  }

  // update the text input
  const updateUrlText = (text: string) => {
    setUrlText(text);
  };

  // go to the next page
  const goForward = () => {
    if (browserRef && canGoForward) {
      browserRef?.current?.goForward();
    }
  };

  // go back to the last page
  const goBack = () => {
    if (browserRef && canGoBack) {
      browserRef?.current?.goBack();
    }
  };

  // reload the page
  const reload = () => {
    if (browserRef) {
      browserRef?.current?.reload();
      // console.log(browserRef.current, 'browser reference')
    }
  };

  // called when there is an error in the browser
  const onBrowserError = (syntheticEvent: {nativeEvent: any}) => {
    const {nativeEvent} = syntheticEvent;
    console.warn('WebView error: ', nativeEvent);
  };

  // called when the webview is loaded
  const onBrowserLoad = (syntheticEvent: {
    nativeEvent: {
      canGoForward: any;
      canGoBack: any;
      title: any;
      loading: any;
      url: any;
    };
  }) => {
    // console.log(syntheticEvent, 'browser events')
    const {canGoForward, canGoBack, title, loading, url} =
      syntheticEvent.nativeEvent;
    // console.log(url, 'url domain')
    setTitleUrl(url);
    setCanGoForward(canGoForward);
    setCanGoBack(canGoBack);
    setTitle(title);
    setLoading(loading);
  };

  const onLoadProgress = (syntheticEvent: {loading: any}) => {
    const {loading} = syntheticEvent;
    // console.log(loading, 'loading')
    setLoading(loading);
  };

  const onLoadEnd = (syntheticEvent: {loading: any}) => {
    const {loading} = syntheticEvent;
    setLoading(loading);
  };

  // called when the navigation state changes (page load)
  const onNavigationStateChange = (navState: {
    canGoForward: any;
    canGoBack: any;
    title: any;
    url: any;
  }) => {
    const {canGoForward, canGoBack, title, url} = navState;

    const success = url?.split('?')?.[1];
    if (url?.includes('https://bulvds.com')) {
      navigation.navigate('BookingStatus', {
        ref: queryToObject(success),
        property: params?.property,
        bookingInfo: params?.bookingInfo,
      });
    }

    setTitleUrl(url);
    setCanGoForward(canGoForward);
    setCanGoBack(canGoBack);
    setTitle(title);
  };

  // can prevent requests from fulfilling, good to log requests
  // or filter ads and adult content.
  const filterRequest = () => {
    return true;
  };

  // called when the browser sends a message using "window.ReactNativeWebView.postMessage"
  const onBrowserMessage = () => {
    // console.log('Got message from the browser:', event.nativeEvent.data);
  };

  const handleGoBack = () => {
    // toggleModal();
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routeNames: ['tabs'],
        routes: [{name: 'tabs'}],
      });
    }, 300);
  };

  const transactionSuccess = useCallback(() => {
    navigation.reset({
      index: 0,
      routeNames: ['tabs'],
      routes: [{name: 'tabs'}],
    });
  }, [navigation]);

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.BASE_PRIMARY}>
      <View style={styles.browserBar}>
        <View style={styles.addressbar}>
          <Text style={styles.browserTitle} color={theme.colors.WHITE}>
            {titleUrl === '' ? formatTitleUrl(url) : formatTitleUrl(titleUrl)}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close-icon" />
        </TouchableOpacity>
      </View>
      <View style={styles.browserContainer}>
        <WebView
          ref={browserRef}
          originWhitelist={['*']}
          source={{uri: currentUrl}}
          onLoad={onBrowserLoad}
          onError={onBrowserError}
          // renderError={renderError}
          onNavigationStateChange={onNavigationStateChange}
          startInLoadingState
          // renderLoading={() => <Spinner size="small" color={colors.violet} />}
          onShouldStartLoadWithRequest={filterRequest}
          onMessage={onBrowserMessage}
          onLoadEnd={onLoadEnd}
          onLoadProgress={onLoadProgress}
          dataDetectorTypes={config.detectorTypes}
          thirdPartyCookiesEnabled={config.allowCookies}
          domStorageEnabled={config.allowStorage}
          javaScriptEnabled={config.allowJavascript}
          geolocationEnabled={config.allowLocation}
          cacheEnabled={config.allowCaching}
          injectedJavaScript={injectedJavaScript}
          allowsInlineMediaPlayback
          allowsFullscreenVideo
          allowsBackForwardNavigationGestures
          allowsLinkPreview
          pullToRefreshEnabled
          menuItems={[
            {label: 'Tweet', key: 'tweet'},
            {label: 'Save for later', key: 'saveForLater'},
          ]}
          onCustomMenuSelection={webViewEvent => {
            // console.log(webViewEvent.nativeEvent, 'webview event')
            const {label} = webViewEvent.nativeEvent; // The name of the menu item, i.e. 'Tweet'
            const {key} = webViewEvent.nativeEvent; // The key of the menu item, i.e. 'tweet'
            const {selectedText} = webViewEvent.nativeEvent; // Text highlighted
          }}
        />
      </View>
      <View style={[styles.bottomTab]}>
        <TouchableOpacity style={styles.tab} onPress={() => goBack()}>
          <Icon
            name="chevron-left"
            color={canGoBack ? theme.colors.WHITE : theme.colors.BASE_PRIMARY}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => goForward()}>
          <Icon
            name="chevron-right-2"
            color={
              canGoForward ? theme.colors.WHITE : theme.colors.BASE_PRIMARY
            }
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => reload()}>
          <Icon name="reload" />
        </TouchableOpacity>
      </View>
      <Loader loading={verifying} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  browser: {
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: theme.colors.WHITE,
    paddingTop: hp(35),
  },
  icon: {
    width: wp(30),
    height: hp(30),
    resizeMode: 'contain',
  },
  disabled: {
    opacity: 0.3,
  },
  browserTitle: {
    marginLeft: wp(5),
    color: theme.colors.WHITE,
  },
  browserBar: {
    height: hp(55),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(20),
  },
  browserContainer: {
    flex: 2,
  },
  addressbar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btns: {
    marginRight: wp(8),
  },
  bottomTab: {
    height: hp(70),
    backgroundColor: theme.colors.BASE_PRIMARY,
    width: '100%',
    flexDirection: 'row',
  },
  tab: {
    height: hp(65),
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
