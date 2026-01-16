import React, {useCallback, useEffect, useState} from 'react';
import {Box, Text} from 'design-system';
import {hp, wp} from 'utils';
import {
  FlatList,
  RefreshControl,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'shared';
import theme from 'theme';
import {styles} from './style';
import {PromotionItem} from './PromotionItem';
import {useApproveDeclinePromoRequest, useGetPromotionRequests} from 'store';
import {EmptyPromotionContainer} from './EmptyPromotionContainer';
import {OngoingPromotionDetails, PromotionDetails} from '../modals';
import {showMessage} from 'react-native-flash-message';
import {PromoRequest} from 'interfaces/services';
import {useQueryClient} from '@tanstack/react-query';

export const BookingHistory = () => {
  const queryClient = useQueryClient();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
  } = useGetPromotionRequests();
  const [open, setOpen] = useState<
    'promotion-details' | 'ongoing-promotion-details' | ''
  >('');
  const [selectedPromotion, setSelectedPromotion] =
    useState<PromoRequest | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const {mutate: approveDeclinePromotion} = useApproveDeclinePromoRequest({
    onSuccess: (
      _: any,
      variables: {requestId: string; status: 'accepted' | 'declined'},
    ) => {
      setOpen('');
      setSelectedPromotion(null);
      // Invalidate queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: ['get-promotion-requests'],
      });
      showMessage({
        message:
          variables.status === 'accepted'
            ? 'Promotion accepted successfully'
            : 'Promotion declined successfully',
        type: 'success',
      });
    },
    onError: (error: any) => {
      showMessage({
        message: error?.message || 'Failed to process promotion request',
        type: 'danger',
      });
    },
  });

  // Flatten all pages into a single array
  const promoRequests =
    data?.pages?.flatMap(page => page?.data?.promoRequests || []) || [];

  useEffect(() => {
    refetch();
  }, [refetch]);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Reset and refetch the query from the first page
      await queryClient.resetQueries({
        queryKey: ['get-promotion-requests'],
      });
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [queryClient, refetch]);

  const renderHeader = () => (
    <Box mt={hp(10)}>
      <Box
        flexDirection={'row'}
        justifyContent={'space-between'}
        borderWidth={1}
        as={TouchableOpacity}
        activeOpacity={0.8}
        mx={wp(16)}
        borderColor={theme.colors.BASE_SECONDARY}
        borderRadius={hp(24)}
        px={wp(16)}
        py={hp(10)}
        alignSelf={'flex-start'}
        alignItems={'center'}>
        <Icon name="filter-icon" />
        <Text variant="bodyMedium" px={wp(2)} color={theme.colors.WHITE}>
          Filter by
        </Text>

        <Icon name="drop-down-icon" />
        <Text variant="bodyBold" pl={wp(2)} color={theme.colors.WHITE}>
          All Bookings
        </Text>
      </Box>

      <Box mt={hp(20)} mx={wp(16)} style={styles.searchInputContainer}>
        <Icon name="search-icon" />
        <TextInput
          style={styles.searchTextInput}
          placeholder="Search DJ"
          selectionColor={theme.colors.WHITE}
          placeholderTextColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
        />
      </Box>
    </Box>
  );

  return (
    <Box mt={hp(20)}>
      <FlatList
        contentContainerStyle={{
          paddingBottom: hp(100),
        }}
        ListHeaderComponent={renderHeader}
        data={promoRequests}
        renderItem={({item}) => {
          console.log(item);
          console.log(item?.playInfo?.requestStatus);
          return (
            <PromotionItem
              promotion={item}
              onPress={() => {
                setSelectedPromotion(item);
                if (item?.playInfo?.requestStatus === 'pending') {
                  setOpen('promotion-details');
                } else {
                  setOpen('ongoing-promotion-details');
                }
              }}
            />
          );
        }}
        keyExtractor={(item, index) =>
          item?.playInfo?.playId || index.toString()
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.WHITE}
            colors={[theme.colors.WHITE]}
          />
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <Box py={hp(20)} alignItems="center">
              <Text variant="body" color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                Loading more...
              </Text>
            </Box>
          ) : null
        }
        ListEmptyComponent={
          !isLoading ? (
            <EmptyPromotionContainer
              icon="empty-folder"
              containerStyles={{my: hp(100)}}
              title="No Promotions"
              subTitle="You do not have any available promotions"
            />
          ) : null
        }
      />

      <PromotionDetails
        isVisible={open === 'promotion-details'}
        promotion={selectedPromotion}
        onClose={() => {
          setOpen('');
          setSelectedPromotion(null);
        }}
        onAccept={() => {
          if (selectedPromotion?.playInfo?.playId) {
            approveDeclinePromotion({
              requestId: selectedPromotion.playInfo.playId,
              status: 'accepted',
            });
          }
        }}
        onDecline={() => {
          if (selectedPromotion?.playInfo?.playId) {
            approveDeclinePromotion({
              requestId: selectedPromotion.playInfo.playId,
              status: 'declined',
            });
          }
        }}
      />

      <OngoingPromotionDetails
        isVisible={open === 'ongoing-promotion-details'}
        promotion={selectedPromotion}
        onClose={() => {
          setOpen('');
          setSelectedPromotion(null);
        }}
      />
    </Box>
  );
};
