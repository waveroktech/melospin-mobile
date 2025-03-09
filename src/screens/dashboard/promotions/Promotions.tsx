import React, {useEffect, useState} from 'react';
import {Icon, Loader, Screen} from 'shared';
import {DashboardHeader} from '../home/components';
import {FlatList, TextInput} from 'react-native';
import {Box, Button, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {styles} from './style';
import {EmptyPromotionContainer, PromotionItem} from './components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {DashboardStackParamList} from 'types';
import {useUserPromotions} from 'store/usePromotion';

export const Promotions = () => {
  const {navigate} = useNavigation<NavigationProp<DashboardStackParamList>>();

  const {data, refetch, isPending} = useUserPromotions();

  useEffect(() => {
    refetch();
  }, [refetch]);

  console.log(data?.data);

  return (
    <Screen removeSafeaArea>
      <DashboardHeader title="Promotions" />
      <Box mt={hp(20)}>
        <Text
          variant="body"
          px={wp(16)}
          fontSize={fontSz(14)}
          color={theme.colors.WHITE}>
          Promo history
        </Text>

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
          data={data?.data}
          renderItem={({item, index}) => (
            <PromotionItem promotion={item} key={index} />
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

      <Button
        isNotBottom
        title="Promote new"
        hasBorder
        iconName="arrow-right-3"
        position={'absolute'}
        bg={theme.colors.PRIMARY_100}
        onPress={() => navigate('AddPromotion')}
        right={wp(20)}
        width={wp(160)}
        bottom={20}
      />

      <Loader loading={isPending} />
    </Screen>
  );
};
