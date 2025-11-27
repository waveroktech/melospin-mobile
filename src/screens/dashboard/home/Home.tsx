/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Box, Text} from 'design-system';
import {Icon, Loader, Screen} from 'shared';
import theme from 'theme';
import {
  ScrollView,
  UIManager,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DashboardHeader,
  TrendingNow,
  DjsOnDeck,
  NewReleases,
} from './components';
import {fontSz, hp, wp} from 'utils';
import {styles} from './style';
import {
  useGetBankList,
  useGetDjs,
  useGetUserProfile,
  useMelospinStore,
} from 'store';
import {GradientBorderView} from '@good-react-native/gradient-border';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BottomTabStackParamList, DashboardStackParamList} from 'types';

export const Home = () => {
  // Enable layout animation for Android
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const {userType} = useMelospinStore();
  const {navigate} =
    useNavigation<
      NavigationProp<DashboardStackParamList & BottomTabStackParamList>
    >();
  const {data, isPending, refetch} = useGetDjs();
  const {userData, userInfo} = useMelospinStore();
  useGetBankList();

  useGetUserProfile({
    userId: userData?.userId,
  });

  useEffect(() => {
    if (userType === 'artiste') {
      refetch();
    }
  }, [refetch, userType]);

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.PRIMARY}>
      <ScrollView>
        <DashboardHeader title="Home" />
        {userType === 'artiste' ? (
          <Box mt={hp(30)} mx={wp(16)}>
            <TrendingNow />

            <NewReleases releases={[]} />

            <DjsOnDeck djs={data?.data} />
          </Box>
        ) : userType === 'dj' ? (
          <Box mt={hp(30)} mx={wp(16)}>
            <Text
              variant="bodyMedium"
              fontSize={fontSz(16)}
              fontFamily={theme.font.AvenirNextSemiBold}
              color={theme.colors.WHITE}>
              My Deck
            </Text>

            <GradientBorderView
              gradientProps={{
                colors: ['#FFFFFF', '#D73C3C', '#8932F7'],
              }}
              style={[styles.gradientContainer, {pointerEvents: 'box-none'}]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: hp(10),
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => navigate('Discography')}
                  activeOpacity={0.8}
                  style={{
                    width: wp(100),
                    height: hp(102),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    variant="body"
                    fontSize={fontSz(12)}
                    pb={hp(10)}
                    color={theme.colors.WHITE}>
                    My Playlists
                  </Text>
                  <Icon name="playlist-icon" />
                </TouchableOpacity>
                <Box mx={wp(20)}>
                  <Icon name="border-width" />
                </Box>
                <TouchableOpacity
                  onPress={() => navigate('Promotions')}
                  activeOpacity={0.8}
                  style={{
                    width: wp(100),
                    height: hp(102),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    variant="body"
                    fontSize={fontSz(12)}
                    pb={hp(10)}
                    color={theme.colors.WHITE}>
                    My Promotions
                  </Text>
                  <Icon name="promotion-icon" />
                </TouchableOpacity>
              </View>
              <Box
                borderTopWidth={1}
                mx={wp(30)}
                py={hp(20)}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                borderTopColor={theme.colors.BASE_SECONDARY}>
                <Box
                  borderRightWidth={1}
                  borderRightColor={theme.colors.BASE_SECONDARY}
                  pr={wp(10)}>
                  <Box flexDirection={'row'}>
                    <Icon name="star-rating" />
                    <Text
                      pl={wp(1)}
                      variant="body"
                      color={theme.colors.WHITE}
                      fontSize={fontSz(12)}>
                      Play Ratings
                    </Text>
                  </Box>
                  <Text
                    variant="body"
                    fontSize={fontSz(14)}
                    pt={hp(2)}
                    color={theme.colors.WHITE}>
                    {userInfo?.ratings}
                  </Text>
                </Box>
                <Box
                  borderRightWidth={1}
                  borderRightColor={theme.colors.BASE_SECONDARY}
                  px={wp(10)}>
                  <Box flexDirection={'row'}>
                    <Icon name="requests" />
                    <Text
                      pl={wp(1)}
                      variant="body"
                      color={theme.colors.WHITE}
                      fontSize={fontSz(12)}>
                      Requests
                    </Text>
                  </Box>
                  <Text
                    variant="bodyMedium"
                    fontSize={fontSz(14)}
                    pt={hp(2)}
                    color={theme.colors.WHITE}>
                    {userInfo?.requests ?? 0}
                  </Text>
                </Box>
                <Box pl={wp(10)}>
                  <Box flexDirection={'row'}>
                    <Icon name="requests" />
                    <Text
                      pl={wp(1)}
                      variant="body"
                      color={theme.colors.WHITE}
                      fontSize={fontSz(12)}>
                      Playlists
                    </Text>
                  </Box>
                  <Text
                    variant="bodyMedium"
                    fontSize={fontSz(14)}
                    pt={hp(2)}
                    color={theme.colors.WHITE}>
                    {userInfo?.playsCount ?? 0}
                  </Text>
                </Box>
              </Box>
            </GradientBorderView>

            <Box mt={hp(30)}>
              <TrendingNow onExplorePress={() => navigate('Explore')} />

              <DjsOnDeck djs={data?.data} />
            </Box>
          </Box>
        ) : null}
      </ScrollView>

      {userType === 'artiste' && <Loader loading={isPending} />}
    </Screen>
  );
};
