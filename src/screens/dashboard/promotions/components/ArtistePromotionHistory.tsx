import React from 'react';
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

interface ArtistePromotionHistoryProps {
  promotions?: any[];
  selectedStatus: string;
  selectedTimeline: string;
  onStatusPress: () => void;
  onTimelinePress: () => void;
  onPromotionPress: (promotion: any) => void;
}

export const ArtistePromotionHistory = ({
  promotions,
  selectedStatus,
  selectedTimeline,
  onStatusPress,
  onTimelinePress,
  onPromotionPress,
}: ArtistePromotionHistoryProps) => {
  const {navigate} = useNavigation<NavigationProp<DashboardStackParamList>>();

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
          />
        </Box>

        <FlatList
          style={styles.flatListContainer}
          contentContainerStyle={styles.contentContainerStyle}
          data={promotions}
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
              title="No Promotions Yet"
              subTitle="You can view and track all promotions history as soon as they are made."
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
