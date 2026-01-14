import React, {useState} from 'react';
import {Icon} from 'shared';
import {FlatList, RefreshControl, ScrollView} from 'react-native';
import {DjConnectHeader} from './DjConnectHeader';
import theme from 'theme';
import {Box, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import {styles} from '../style';
import {ConnectDjItem} from './ConnectDjItem';
import {EmptyPromotionContainer} from '../../promotions/components';

interface DjListEmptyComponentProps {
  search: string;
}

const DjListEmptyComponent = ({search}: DjListEmptyComponentProps) => {
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
};

const createEmptyComponent = (search: string) => () =>
  <DjListEmptyComponent search={search} />;

interface DjExploreViewProps {
  filteredData: any[];
  search: string;
  refreshTrigger: number;
  requestCount?: number;
  connectCount?: number;
  onConnectPress: () => void;
  onRefresh?: () => Promise<void>;
}

export const DjExploreView = ({
  filteredData,
  search,
  refreshTrigger,
  requestCount,
  connectCount,
  onConnectPress,
  onRefresh,
}: DjExploreViewProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (onRefresh) {
      setRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setRefreshing(false);
      }
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={theme.colors.WHITE}
          colors={[theme.colors.WHITE]}
        />
      }>
      <DjConnectHeader
        key={refreshTrigger}
        onPress={onConnectPress}
        requestCount={requestCount ?? 0}
        connectCount={connectCount}
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
        ListEmptyComponent={createEmptyComponent(search)}
      />
    </ScrollView>
  );
};
