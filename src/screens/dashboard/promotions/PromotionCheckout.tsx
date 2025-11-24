/* eslint-disable @typescript-eslint/no-shadow */
import React, {useCallback, useEffect, useState} from 'react';
import {Header, Icon, Screen} from 'shared';
import theme from 'theme';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Image, Linking, ScrollView, TouchableOpacity} from 'react-native';
import {Box, Button, Text} from 'design-system';
import {fontSz, formatNumberWithCommas, hp, wp} from 'utils';
import {DiscographyItem} from '../discography/component';
import {DashboardStackParamList} from 'types';
import {useGetDiscography} from 'store';
import moment from 'moment';
import {GradientBorderView} from '@good-react-native/gradient-border';
import {styles} from './style';
import {useCreatePromotion} from 'store/usePromotion';
import {showMessage} from 'react-native-flash-message';
import {PaymentRedirection, WebviewModal} from './modals';
import {useExternalLinks} from 'hooks';
import WebView from 'react-native-webview';

export const PromotionCheckout = () => {
  const {goBack, navigate} =
    useNavigation<NavigationProp<DashboardStackParamList>>();
  const {data} =
    useRoute<RouteProp<DashboardStackParamList, 'PromotionCheckout'>>()?.params;

  const [accept, setAccept] = useState(false);
  const [open, setOpen] = useState<'payment-info' | 'webview' | ''>('');
  const [url, setUrl] = useState('');
  const [showPromoBudgetDetails, setShowPromoBudgetDetails] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  const {data: discographyList, refetch} = useGetDiscography();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const findDiscography = discographyList?.data?.find(
    (d: {_id: string}) => d._id === data?.discographyId,
  );

  // const combinedArray = data?.activePromoters
  //   .filter((item1: {userId: any}) =>
  //     data?.responseData.some(
  //       (item2: {promoterId: any}) => item1.userId === item2.promoterId,
  //     ),
  //   )
  //   .map((item1: {userId: any}) => {
  //     const item2 = data?.responseData.find(
  //       (item2: {promoterId: any}) => item1.userId === item2.promoterId,
  //     );
  //     return {...item1, ...item2}; // Merge objects
  //   });

  const {mutate, isPending} = useCreatePromotion({
    onSuccess: (data: any) => {
      console.log(data);
      if (data?.status === 'failed') {
        return showMessage({
          message: data?.message,
          type: 'danger',
          duration: 2000,
        });
      }
      if (data?.status === 'success') {
        setOpen('');
        setTimeout(() => {
          if (data?.data?.hasPaymentLink) {
            setUrl(data?.data?.paymentInfo?.authorization_url);
            // Linking.openURL(data?.data?.paymentInfo?.authorization_url);
            setTimeout(() => {
              setOpen('webview');
            }, 300);
          }
        }, 400);
      }
    },
  });

  const handlePayment = useCallback(() => {
    const promoters: any[] = [];
    data?.activePromoters?.map((promoter: any) => {
      promoters.push({promoterId: promoter.userId});
    });
    const totalPrice = data?.responseData?.reduce(
      (acc: any, item: {amount: any}) => acc + item.amount,
      0,
    );

    setOpen('payment-info');

    // mutate({
    //   promotionId: data?.discographyId,
    //   promotionLink: findDiscography?.url,
    //   frequency: data.frequency?.toLowerCase(),
    //   startDate: moment(data.startDate).format('YYYY-MM-DD'),
    //   endDate: moment(data.endDate).format('YYYY-MM-DD'),
    //   bidAmount: Number(data.amount?.split(',')?.join('')),
    //   promoters,
    //   amount: totalPrice,
    // });
  }, [data]);

  const {validLinks} = useExternalLinks(data);

  // Calculate cumulative cost from selected DJs' chargePerPlay
  const cumulativeCost = data?.responseData?.reduce((sum: number, dj: any) => {
    return sum + (Number(dj?.chargePerPlay) || 0);
  }, 0);

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.BASE_PRIMARY}>
      <Header hasBackText="Checkout" onPressLeftIcon={goBack} />

      <ScrollView
        contentContainerStyle={{paddingBottom: hp(160)}}
        showsVerticalScrollIndicator={false}>
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

          {validLinks?.length > 0 && (
            <Box mt={hp(20)} mb={hp(20)} mx={wp(16)}>
              <Text
                variant="bodyBold"
                fontFamily={theme.font.AvenirNextSemiBold}
                color={theme.colors.WHITE}>
                Audio Streaming Links
              </Text>

              <ScrollView horizontal>
                <Box mt={hp(16)} flexDirection={'row'} alignItems={'center'}>
                  {data?.externalLinks
                    ?.filter((song: {link: string}) => song?.link !== '')
                    ?.map((song: any, index: number) => {
                      return (
                        <Box
                          as={TouchableOpacity}
                          activeOpacity={0.8}
                          onPress={() => Linking.openURL(song.link)}
                          key={index}
                          mr={wp(10)}
                          borderRadius={hp(24)}
                          p={hp(12)}
                          bg={theme.colors.OFF_WHITE_500}>
                          <Icon
                            name={
                              song.name === 'spotify'
                                ? 'spotify-icon'
                                : song.name
                            }
                          />
                        </Box>
                      );
                    })}
                </Box>
              </ScrollView>
            </Box>
          )}

          <Box mt={hp(0)} mx={wp(16)}>
            <Box
              bg={theme.colors.BASE_SECONDARY}
              p={hp(24)}
              mt={hp(20)}
              borderRadius={hp(24)}>
              <Box
                as={TouchableOpacity}
                activeOpacity={0.8}
                onPress={() =>
                  setShowPromoBudgetDetails(!showPromoBudgetDetails)
                }
                flexDirection={'row'}
                mb={showPromoBudgetDetails ? hp(20) : 0}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <Text
                  variant="bodyBold"
                  fontFamily={theme.font.AvenirNextSemiBold}
                  color={theme.colors.WHITE}>
                  Promotion Details
                </Text>

                <Box>
                  <Icon
                    name={
                      showPromoBudgetDetails ? 'arrow-up-2' : 'arrow-down-2'
                    }
                  />
                </Box>
              </Box>

              {showPromoBudgetDetails && (
                <>
                  <Box
                    flexDirection={'row'}
                    alignItems={'center'}
                    borderBottomWidth={1}
                    pb={2}
                    borderBottomColor={theme.colors.BASE_SECONDARY}
                    justifyContent={'space-between'}>
                    <Text
                      variant="body"
                      color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                      Promo Start Date
                    </Text>
                    <Text variant="bodyBold" color={theme.colors.WHITE}>
                      {moment(data?.time).format('MM/DD/YYYY')}
                    </Text>
                  </Box>
                  <Box
                    flexDirection={'row'}
                    alignItems={'center'}
                    borderBottomWidth={1}
                    pt={hp(14)}
                    pb={2}
                    borderBottomColor={theme.colors.BASE_SECONDARY}
                    justifyContent={'space-between'}>
                    <Text
                      variant="body"
                      color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                      Promotion Timeline
                    </Text>
                    <Text variant="bodyBold" color={theme.colors.WHITE}>
                      {data?.timeline}
                    </Text>
                  </Box>

                  <Box mt={hp(12)} flexDirection={'row'} alignItems={'center'}>
                    <Icon name="info-icon" />
                    <Text
                      variant="body"
                      color={theme.colors.WHITE}
                      style={{fontSize: fontSz(10), marginLeft: wp(6)}}>
                      This promotion will be played by every assigned DJ at
                      least 12 times each month, with proof verified by our
                      team.
                    </Text>
                  </Box>
                </>
              )}
            </Box>
          </Box>

          <Box
            p={hp(24)}
            mt={hp(20)}
            mx={wp(16)}
            bg={theme.colors.BASE_SECONDARY}
            borderRadius={hp(24)}>
            <Box
              as={TouchableOpacity}
              activeOpacity={0.8}
              onPress={() => setShowPaymentDetails(!showPaymentDetails)}
              flexDirection={'row'}
              alignItems={'center'}
              mb={showPaymentDetails ? hp(20) : 0}
              justifyContent={'space-between'}>
              <Text variant="bodyBold" color={theme.colors.WHITE}>
                Payment Details
              </Text>
              <Icon name={showPaymentDetails ? 'arrow-up-2' : 'arrow-down-2'} />
            </Box>

            {showPaymentDetails && (
              <Box mt={hp(20)}>
                <Box
                  flexDirection={'row'}
                  alignItems={'center'}
                  borderBottomWidth={1}
                  pb={2}
                  mb={hp(12)}
                  borderBottomColor={theme.colors.BASE_SECONDARY}
                  justifyContent={'space-between'}>
                  <Text
                    variant="body"
                    color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                    Assigned DJs
                  </Text>
                  <Text variant="bodyBold" color={theme.colors.WHITE}>
                    {data?.responseData?.length}
                  </Text>
                </Box>
                <Box
                  flexDirection={'row'}
                  alignItems={'center'}
                  borderBottomWidth={1}
                  pb={2}
                  mb={hp(12)}
                  borderBottomColor={theme.colors.BASE_SECONDARY}
                  justifyContent={'space-between'}>
                  <Text
                    variant="body"
                    color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                    Cummulative Cost (NGN)
                  </Text>
                  <Text variant="bodyBold" color={theme.colors.WHITE}>
                    NGN{' '}
                    {formatNumberWithCommas(cumulativeCost?.toString() || '0')}
                  </Text>
                </Box>
                <Box
                  flexDirection={'row'}
                  alignItems={'center'}
                  borderBottomWidth={1}
                  pb={2}
                  mb={hp(12)}
                  borderBottomColor={theme.colors.BASE_SECONDARY}
                  justifyContent={'space-between'}>
                  <Text
                    variant="body"
                    color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                    Service Fee (5%)
                  </Text>
                  <Text variant="bodyBold" color={theme.colors.WHITE}>
                    NGN{' '}
                    {formatNumberWithCommas(
                      (cumulativeCost * 0.05)?.toString() || '0',
                    )}
                  </Text>
                </Box>

                <Box
                  flexDirection={'row'}
                  alignItems={'center'}
                  borderBottomWidth={1}
                  pb={2}
                  mb={hp(12)}
                  borderBottomColor={theme.colors.BASE_SECONDARY}
                  justifyContent={'space-between'}>
                  <Text
                    variant="body"
                    color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
                    Total Amount Due
                  </Text>
                  <Text variant="bodyBold" color={theme.colors.WHITE}>
                    NGN{' '}
                    {formatNumberWithCommas(
                      (cumulativeCost + cumulativeCost * 0.05)?.toString() ||
                        '0',
                    )}
                  </Text>
                </Box>
              </Box>
            )}
          </Box>

          <Box mt={hp(40)} mx={wp(16)} flexDirection={'row'}>
            <Box
              as={TouchableOpacity}
              activeOpacity={0.8}
              onPress={() => setAccept(!accept)}>
              <Icon name={accept ? 'checkbox-active' : 'checkbox-2'} />
            </Box>
            <Text
              pl={wp(10)}
              width={wp(300)}
              variant="body"
              color={theme.colors.WHITE}>
              By clicking Pay now, you have read and agreed to our{' '}
              <Text
                variant="body"
                color={theme.colors.LIGHT_PRIMARY}
                style={styles.textDecoration}>
                Terms of service
              </Text>{' '}
              and{' '}
              <Text
                variant="body"
                color={theme.colors.LIGHT_PRIMARY}
                style={styles.textDecoration}>
                Business policy
              </Text>
            </Text>
          </Box>
        </Box>
      </ScrollView>

      <Box
        position={'absolute'}
        bottom={hp(0)}
        bg={theme.colors.BASE_PRIMARY}
        alignSelf={'center'}
        justifyContent={'center'}
        height={hp(100)}>
        <Button
          isNotBottom
          disabled={accept ? false : true}
          bottom={hp(10)}
          onPress={handlePayment}
          title="Pay Now"
          hasBorder
        />
      </Box>

      <PaymentRedirection
        isLoading={isPending}
        isVisible={open === 'payment-info'}
        onClose={() => setOpen('')}
      />

      <WebviewModal
        isVisible={open === 'webview'}
        onClose={() => setOpen('')}
        url={url}
      />
    </Screen>
  );
};
