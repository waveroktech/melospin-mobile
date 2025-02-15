import React from 'react';
import {Icon, Screen} from 'shared';
import {DashboardHeader} from '../home/components';
import {ScrollView, TextInput} from 'react-native';
import {Box, Button, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {styles} from './style';
import {promotions} from 'data';
import {PromotionItem} from './components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {DashboardStackParamList} from 'types';

export const Promotions = () => {
  const {navigate} = useNavigation<NavigationProp<DashboardStackParamList>>();
  return (
    <Screen removeSafeaArea>
      <DashboardHeader title="Promotions" />
      <ScrollView>
        <Box mt={hp(20)} mx={wp(16)}>
          <Text variant="body" fontSize={fontSz(14)} color={theme.colors.WHITE}>
            Promo history
          </Text>

          <Box mt={hp(20)} style={styles.searchInputContainer}>
            <Icon name="search-icon" />
            <TextInput
              style={styles.searchTextInput}
              placeholder="Search"
              selectionColor={theme.colors.WHITE}
              placeholderTextColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
            />
          </Box>

          <Box mt={hp(20)}>
            {promotions?.map(promotion => {
              return <PromotionItem promotion={promotion} />;
            })}
          </Box>
        </Box>
      </ScrollView>

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
        bottom={hp(130)}
      />
    </Screen>
  );
};
