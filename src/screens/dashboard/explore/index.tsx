import React, {useCallback, useState} from 'react';
import {AvoidingView, Icon, Screen} from 'shared';
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
import {djs} from 'data';
import {
  useGetConnectionRequests,
  useGetConnections,
  useMelospinStore,
} from 'store';
import {useFocusEffect} from '@react-navigation/native';
import {ConnectionRequests} from './modals';

export const Explore = () => {
  const [open, setOpen] = useState<'dj-connects' | ''>('');
  const {data: connections, refetch: refetchConnections} = useGetConnections();

  const {data: connectionRequests, refetch: refetchConnectionRequests} =
    useGetConnectionRequests();

  const {userType} = useMelospinStore();

  useFocusEffect(
    useCallback(() => {
      refetchConnections();
      refetchConnectionRequests();
    }, [refetchConnections, refetchConnectionRequests]),
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
                placeholder="Search by name e.g djzenzee"
                selectionColor={theme.colors.WHITE}
                placeholderTextColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
              />
            </Box>

            <FlatList
              contentContainerStyle={styles.contentContainerStyle}
              data={djs}
              numColumns={2}
              renderItem={({item}) => <ConnectDjItem item={item} />}
            />
          </ScrollView>
        </AvoidingView>
      ) : (
        <ScrollView>
          <DjConnectHeader onPress={() => setOpen('dj-connects')} />
        </ScrollView>
      )}

      <ConnectionRequests
        isVisible={open === 'dj-connects'}
        onClose={() => setOpen('')}
      />
    </Screen>
  );
};
