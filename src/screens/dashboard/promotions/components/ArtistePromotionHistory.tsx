import React, {useMemo, useState} from 'react';
import {Icon} from 'shared';
import {FlatList, TextInput} from 'react-native';
import {Box, Button, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {styles} from '../style';
import {FilterTabs} from './FilterTabs';
import {PromotionItem} from './PromotionItem';
import {EmptyPromotionContainer} from './EmptyPromotionContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {DashboardStackParamList} from 'types';
import moment from 'moment';

interface ArtistePromotionHistoryProps {
  promotions?: any[];
  selectedStatus: string;
  selectedTimeline: string;
  onStatusPress: () => void;
  onTimelinePress: () => void;
  onPromotionPress: (promotion: any) => void;
  onResetStatus?: () => void;
  onResetTimeline?: () => void;
}

export const ArtistePromotionHistory = ({
  promotions,
  selectedStatus,
  selectedTimeline,
  onStatusPress,
  onTimelinePress,
  onPromotionPress,
  onResetStatus,
  onResetTimeline,
}: ArtistePromotionHistoryProps) => {
  const {navigate} = useNavigation<NavigationProp<DashboardStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter promotions based on status, timeline, and search query
  const filteredPromotions = useMemo(() => {
    if (!promotions || promotions.length === 0) {
      return [];
    }

    return promotions.filter(promotion => {
      // Filter by status
      if (selectedStatus !== 'All') {
        const promotionStatus =
          promotion?.details?.status?.toLowerCase() || '';
        const normalizedStatus = promotionStatus.replace(/\s+/g, '-');
        const selectedStatusLower = selectedStatus.toLowerCase().replace(/\s+/g, '-');

        if (normalizedStatus !== selectedStatusLower) {
          return false;
        }
      }

      // Filter by timeline
      if (selectedTimeline && selectedTimeline !== 'All Time') {
        const startDate = promotion?.details?.startDate;
        if (!startDate) {
          return false;
        }

        const promoDate = moment(startDate);
        const now = moment();
        let shouldInclude = false;

        switch (selectedTimeline) {
          case 'Today':
            shouldInclude = promoDate.isSame(now, 'day');
            break;
          case 'Yesterday':
            shouldInclude = promoDate.isSame(now.clone().subtract(1, 'day'), 'day');
            break;
          case 'This Week':
            shouldInclude = promoDate.isSame(now, 'week');
            break;
          case 'This Month':
            shouldInclude = promoDate.isSame(now, 'month');
            break;
          case 'Last Month':
            shouldInclude = promoDate.isSame(
              now.clone().subtract(1, 'month'),
              'month',
            );
            break;
          default:
            shouldInclude = true;
        }

        if (!shouldInclude) {
          return false;
        }
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const title = (promotion?.title || '').toLowerCase();
        const ownerName =
          `${promotion?.details?.owner?.firstName || ''} ${
            promotion?.details?.owner?.lastName || ''
          }`.toLowerCase();
        const brandName = (promotion?.details?.owner?.brandName || '').toLowerCase();

        if (
          !title.includes(query) &&
          !ownerName.includes(query) &&
          !brandName.includes(query)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [promotions, selectedStatus, selectedTimeline, searchQuery]);

  return (
    <>
      <Box mt={hp(20)}>
        <Text
          variant="body"
          px={wp(16)}
          fontSize={fontSz(14)}
          color={theme.colors.WHITE}>
          Promo history
        </Text>

        <FilterTabs
          title="Filter Tab"
          resetFilters={() => {
            setSearchQuery('');
            onResetStatus?.();
            onResetTimeline?.();
          }}
          filters={[
            {
              label: 'Status',
              value: selectedStatus,
              onPress: onStatusPress,
            },
            {
              label: 'Timeline',
              value: selectedTimeline,
              onPress: onTimelinePress,
            },
          ]}
        />

        <Box mt={hp(20)} mx={wp(16)} style={styles.searchInputContainer}>
          <Icon name="search-icon" />
          <TextInput
            style={styles.searchTextInput}
            placeholder="Search"
            selectionColor={theme.colors.WHITE}
            placeholderTextColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </Box>

        <FlatList
          style={styles.flatListContainer}
          contentContainerStyle={styles.contentContainerStyle}
          data={filteredPromotions}
          renderItem={({item, index}) => (
            <PromotionItem
              promotion={item}
              key={index}
              onPress={() => onPromotionPress(item)}
            />
          )}
          ListEmptyComponent={
            <EmptyPromotionContainer
              icon="empty-folder"
              title={
                searchQuery.trim() ||
                selectedStatus !== 'All' ||
                selectedTimeline !== 'All Time'
                  ? 'No Promotions Found'
                  : 'No Promotions Yet'
              }
              subTitle={
                searchQuery.trim() ||
                selectedStatus !== 'All' ||
                selectedTimeline !== 'All Time'
                  ? 'Try adjusting your filters or search terms to find what you\'re looking for'
                  : 'You can view and track all promotions history as soon as they are made.'
              }
            />
          }
        />
      </Box>

      <Box
        position="absolute"
        right={wp(20)}
        bottom={hp(90) + hp(20) + hp(20)}
        zIndex={10}>
        <Button
          title="Promote new"
          hasBorder
          isNotBottom
          iconName="arrow-right-3"
          bg={theme.colors.PRIMARY_100}
          onPress={() => navigate('AddPromotion')}
          width={wp(160)}
        />
      </Box>
    </>
  );
};
