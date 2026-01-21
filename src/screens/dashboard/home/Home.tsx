
import React, {useEffect} from 'react';
import {Loader, Screen} from 'shared';
import theme from 'theme';
import {ScrollView, UIManager, Platform} from 'react-native';
import {DashboardHeader} from './components';
import {MyDeck} from './components/MyDeck';
import {ArtisteHome} from './components/ArtisteHome';
import {hp} from 'utils';
import {
  useGetBankList,
  useGetDjs,
  useGetUserProfile,
  useMelospinStore,
} from 'store';

export const Home = () => {
  // Enable layout animation for Android
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const {userType} = useMelospinStore();
  const {data, isPending, refetch} = useGetDjs(
    userType === 'artiste' || userType === 'dj',
  );
  const {userData} = useMelospinStore();
  useGetBankList();

  useGetUserProfile({
    userId: userData?.userId,
  });

  useEffect(() => {
    if (userType === 'artiste' || userType === 'dj') {
      refetch();
    }
  }, [refetch, userType]);

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.PRIMARY}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp(150)}}>
        <DashboardHeader title="Home" />
        {userType === 'artiste' ? (
          <ArtisteHome djs={data?.data} releases={[]} />
        ) : userType === 'dj' ? (
          <MyDeck djs={data?.data} />
        ) : null}
      </ScrollView>

      {userType === 'artiste' && <Loader loading={isPending} />}
    </Screen>
  );
};
