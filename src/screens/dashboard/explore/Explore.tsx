/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useEffect, useState} from 'react';
import {AvoidingView, Icon, Loader, Screen} from 'shared';
import {DashboardHeader} from '../home/components';
import {FlatList, ScrollView, TextInput} from 'react-native';
import {
  ConnectDjItem,
  DjConnectHeader,
  ExploreHeaderContainer,
} from './components';
import theme from 'theme';
import {Box, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import {styles} from './style';
import {
  useGetConnectionRequests,
  useGetConnections,
  useGetDjs,
  useMelospinStore,
} from 'store';
import {useFocusEffect} from '@react-navigation/native';
import {ConnectionRequests} from './modals';
import {EmptyPromotionContainer} from '../promotions/components';

export const Explore = () => {
  const [open, setOpen] = useState<'dj-connects' | ''>('');
  const [search, setSearch] = useState('');
  const {data: connections, refetch: refetchConnections} = useGetConnections();
  const {data, isPending, refetch} = useGetDjs();

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(data?.data);
  }, [data?.data]);

  useEffect(() => {
    if (search) {
      setFilteredData(
        data?.data?.filter((item: {name: string}) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }
  }, [data?.data, search]);

  const {data: connectionRequests, refetch: refetchConnectionRequests} =
    useGetConnectionRequests();

  const {userType} = useMelospinStore();

  useFocusEffect(
    useCallback(() => {
      refetchConnections();
      refetch();
      refetchConnectionRequests();
    }, [refetchConnections, refetchConnectionRequests, refetch]),
  );

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.BASE_PRIMARY}>
      <DashboardHeader title="Explore" />

      {userType === 'artiste' ? (
        <AvoidingView>
          <ScrollView>
            <ExploreHeaderContainer />

            <Box
              flexDirection={'row'}
              alignItems={'center'}
              mx={wp(20)}
              mt={hp(20)}>
              <Icon name="explore-dj" />
              <Text
                pl={wp(10)}
                variant="bodyMedium"
                fontSize={fontSz(14)}
                color={theme.colors.WHITE}>
                Explore DJs
              </Text>
            </Box>

            <Box mt={hp(20)} style={styles.searchInputContainer}>
              <Icon name="search-icon" />
              <TextInput
                style={styles.searchTextInput}
                onChangeText={setSearch}
                placeholder="Search by name e.g djzenzee"
                selectionColor={theme.colors.WHITE}
                placeholderTextColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
              />
            </Box>

            <FlatList
              contentContainerStyle={styles.contentContainerStyle}
              data={filteredData}
              numColumns={2}
              renderItem={({item}) => <ConnectDjItem item={item} />}
              ListEmptyComponent={() => {
                if (search) {
                  return (
                    <EmptyPromotionContainer
                      icon="empty-folder"
                      title="No DJs found"
                      containerStyles={{my: hp(20)}}
                      subTitle="Please try again with a different search"
                    />
                  );
                }
                return (
                  <EmptyPromotionContainer
                    icon="empty-folder"
                    title="No DJs found"
                    containerStyles={{my: hp(20)}}
                    subTitle="There are no DJs available at the moment"
                  />
                );
              }}
            />
          </ScrollView>
        </AvoidingView>
      ) : (
        <ScrollView>
          <DjConnectHeader
            onPress={() => setOpen('dj-connects')}
            requestCount={connectionRequests?.data?.connections?.length}
            connectCount={connections?.data?.length}
          />

          <Box
            borderTopWidth={1}
            pt={hp(20)}
            flexDirection={'row'}
            alignItems={'center'}
            borderColor={theme.colors.BASE_SECONDARY}
            mx={wp(20)}
            mt={hp(30)}>
            <Icon name="explore-dj" />
            <Text
              pl={wp(10)}
              variant="bodyMedium"
              fontSize={fontSz(14)}
              color={theme.colors.WHITE}>
              Explore DJs
            </Text>
          </Box>

          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            data={filteredData}
            numColumns={2}
            renderItem={({item}) => <ConnectDjItem item={item} />}
            ListEmptyComponent={() => {
              if (search) {
                return (
                  <EmptyPromotionContainer
                    icon="empty-folder"
                    title="No DJs found"
                    containerStyles={{my: hp(20)}}
                    subTitle="Please try again with a different search"
                  />
                );
              }
              return (
                <EmptyPromotionContainer
                  icon="empty-folder"
                  title="No DJs found"
                  containerStyles={{my: hp(20)}}
                  subTitle="There are no DJs available at the moment"
                />
              );
            }}
          />
        </ScrollView>
      )}

      <ConnectionRequests
        isVisible={open === 'dj-connects'}
        onClose={() => setOpen('')}
        connectionRequests={connectionRequests?.data?.connections}
        onComplete={() => {
          refetchConnectionRequests();
        }}
      />

      <Loader loading={isPending} />
    </Screen>
  );
};
