import React, {useEffect} from 'react';
import {Header, Screen} from 'shared';
import theme from 'theme';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {Box, Button, Text} from 'design-system';
import {hp, wp} from 'utils';
import {DiscographyItem} from '../discography/component';
import {DashboardStackParamList} from 'types';
import {useGetDiscography} from 'store';

export const PromotionCheckout = () => {
  const {goBack} = useNavigation();
  const {data} =
    useRoute<RouteProp<DashboardStackParamList, 'PromotionCheckout'>>()?.params;

  const {data: discographyList, refetch} = useGetDiscography();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const findDiscography = discographyList?.data?.find(
    (d: {_id: string}) => d._id === data?.discographyId,
  );
  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.BASE_PRIMARY}>
      <Header hasBackText="Checkout" onPressLeftIcon={goBack} />

      <ScrollView>
        <Box mt={hp(20)}>
          <Text
            variant="bodyBold"
            pb={hp(10)}
            px={wp(16)}
            fontFamily={theme.font.AvenirNextSemiBold}
            color={theme.colors.WHITE}>
            File Upload
          </Text>

          <DiscographyItem item={findDiscography} />

          <Box mt={hp(20)} mx={wp(16)}>
            <Text
              variant="bodyBold"
              fontFamily={theme.font.AvenirNextSemiBold}
              color={theme.colors.WHITE}>
              Audio Streaming Links
            </Text>

            <ScrollView horizontal></ScrollView>
          </Box>
        </Box>
      </ScrollView>

      <Button title="Pay Now" hasBorder />
    </Screen>
  );
};
