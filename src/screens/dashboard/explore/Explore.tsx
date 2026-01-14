import React, {useCallback, useEffect, useState} from 'react';
import {Loader, Screen} from 'shared';
import {DashboardHeader} from '../home/components';
import {ArtisteExploreView, DjExploreView} from './components';
import theme from 'theme';
import {
  useGetConnectionRequests,
  useGetConnections,
  useGetDjs,
  useMelospinStore,
} from 'store';
import {useFocusEffect} from '@react-navigation/native';
import {ConnectionRequests} from './modals';

export const Explore = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Add refresh trigger state

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

  // Trigger rerender when modal closes
  useEffect(() => {
    if (open === null) {
      // Modal was closed, trigger any additional updates
      console.log('Modal closed, triggering updates...');
    }
  }, [open]);

  const connectionRequestsData = connectionRequests?.data?.connections?.filter(
    (item: any) => item?.role === 'recipient',
  );

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.BASE_PRIMARY}>
      <DashboardHeader title="Explore" />

      {userType === 'artiste' ? (
        <ArtisteExploreView
          filteredData={filteredData}
          search={search}
          onSearchChange={setSearch}
        />
      ) : (
        <DjExploreView
          filteredData={filteredData}
          search={search}
          refreshTrigger={refreshTrigger}
          requestCount={connectionRequestsData?.length}
          connectCount={connections?.data?.length}
          onConnectPress={() => setOpen('dj-connects')}
          onRefresh={async () => {
            await Promise.all([
              refetch(),
              refetchConnections(),
              refetchConnectionRequests(),
            ]);
          }}
        />
      )}

      <ConnectionRequests
        isVisible={open === 'dj-connects'}
        onClose={() => setOpen('')}
        connectionRequests={connectionRequests?.data?.connections}
        onComplete={() => {
          refetchConnectionRequests();
          refetchConnections();
          setOpen('');
          setRefreshTrigger(prev => prev + 1); // Trigger rerender
        }}
        onModalHide={() => {
          // Only requery if the modal was actually open
          if (open === 'dj-connects') {
            refetchConnectionRequests();
            refetchConnections();
            setRefreshTrigger(prev => prev + 1); // Trigger rerender
          }
        }}
      />

      <Loader loading={isPending} />
    </Screen>
  );
};
