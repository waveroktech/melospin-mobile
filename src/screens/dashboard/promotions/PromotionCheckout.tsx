/* eslint-disable @typescript-eslint/no-shadow */
import React, {useCallback, useEffect, useState} from 'react';
import {Header, Icon, Screen} from 'shared';
import theme from 'theme';
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Linking, ScrollView, TouchableOpacity} from 'react-native';
import {Box, Button, Text} from 'design-system';
import {fontSz, formatNumberWithCommas, hp, wp} from 'utils';
import {DiscographyItem} from '../discography/component';
import {DashboardStackParamList} from 'types';
import {useGetDiscography} from 'store';
import moment from 'moment';
import {styles} from './style';
import {
  useCreatePromotion,
  usePromotionPaymentSummary,
} from 'store/usePromotion';
import {showMessage} from 'react-native-flash-message';
import {PaymentRedirection, WebviewModal} from './modals';
import {useExternalLinks} from 'hooks';

export const PromotionCheckout = () => {
  const {goBack} = useNavigation<NavigationProp<DashboardStackParamList>>();
  const {data} =
    useRoute<RouteProp<DashboardStackParamList, 'PromotionCheckout'>>()?.params;

  const [accept, setAccept] = useState(false);
  const [open, setOpen] = useState<
    'payment-info' | 'webview' | 'select-audio' | ''
  >('');
  const [url, setUrl] = useState('');
  const [showPromoBudgetDetails, setShowPromoBudgetDetails] = useState(true);
  const [showPaymentDetails, setShowPaymentDetails] = useState(true);
  const [paymentSummary, setPaymentSummary] = useState<any>(null);

  const {data: discographyList, refetch} = useGetDiscography();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const findDiscography = discographyList?.data?.find(
    (d: {_id: string}) => d._id === data?.discographyId,
  );

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
            setUrl(data?.data?.paymentLink);
            // Linking.openURL(data?.data?.paymentInfo?.authorization_url);
            setTimeout(() => {
              setOpen('webview');
            }, 300);
          }
        }, 400);
      }
    },
  });

  const {mutate: getPaymentSummary} = usePromotionPaymentSummary({
    onSuccess: (response: any) => {
      console.log('Payment Summary:', response);
      if (response?.status === 'success' && response?.data) {
        setPaymentSummary(response.data);
      }
    },
    onError: (error: any) => {
      console.error('Payment Summary Error:', error);
    },
  });

  const {validLinks} = useExternalLinks(data);

  // Extract values from payment summary response
  const budgetAmountItem = paymentSummary?.find(
    (item: any) => item?.title === 'budgetAmount',
  );
  const serviceChargeItem = paymentSummary?.find(
    (item: any) => item?.title === 'service charge',
  );

  const budgetAmount = budgetAmountItem?.amount || 0;
  const serviceCharge = serviceChargeItem?.amount || 0;
  const totalAmount = budgetAmount + serviceCharge;

  // Fallback: Calculate cumulative cost from selected DJs' chargePerPlay if no payment summary
  const cumulativeCost = data?.responseData?.reduce((sum: number, dj: any) => {
    return sum + (Number(dj?.chargePerPlay) || 0);
  }, 0);

  // Call payment summary when screen is focused
  useFocusEffect(
    useCallback(() => {
      if (!data || !findDiscography) {
        return;
      }

      const promoters: any[] = [];
      data?.responseData?.forEach((dj: any) => {
        if (dj?.userId) {
          promoters.push({promoterId: dj.userId});
        }
      });

      const cost = cumulativeCost || 0;
      const payload = {
        promotionLink: findDiscography?.url || '',
        startDate: moment(data.startDate || data.date).format('YYYY-MM-DD'),
        endDate: moment(data.endDate).format('YYYY-MM-DD'),
        amount: Number(cost + cost * 0.05),
        bidAmount: Number(cost),
        frequency: data.frequency?.toLowerCase() || 'daily',
        promoters,
        minPlayCount: 12,
        externalLinks: data?.externalLinks || [],
        locations: data?.locations || [],
        promotionTypes: data?.promotionTypes || [],
      };

      getPaymentSummary(payload);
    }, [data, findDiscography, cumulativeCost, getPaymentSummary]),
  );

  const handlePayment = useCallback(() => {
    const promoters: any[] = [];
    data?.responseData?.forEach((dj: any) => {
      if (dj?.userId) {
        promoters.push({promoterId: dj.userId});
      }
    });

    setOpen('payment-info');

    // Build payload and filter out empty/null values
    const rawPayload: any = {
      discographyId: data?.discographyId,
      promotionLink: findDiscography?.url,
      frequency: data.frequency?.toLowerCase(),
      startDate:
        data?.startDate || data?.date
          ? moment(data.startDate || data.date).format('YYYY-MM-DD')
          : undefined,
      endDate: data?.endDate
        ? moment(data.endDate).format('YYYY-MM-DD')
        : undefined,
      bidAmount:
        budgetAmount || cumulativeCost
          ? Number(budgetAmount || cumulativeCost)
          : undefined,
      promoters: promoters.length > 0 ? promoters : undefined,
      amount:
        totalAmount || cumulativeCost
          ? Number(totalAmount || cumulativeCost + cumulativeCost * 0.05)
          : undefined,
      minPlayCount: 12,
      externalLinks:
        data?.externalLinks?.filter(
          (link: any) => link?.link && link.link.trim() !== '',
        ) || undefined,
      locations:
        data?.locations?.filter((loc: string) => loc && loc.trim() !== '') ||
        undefined,
      promotionTypes:
        data?.promotionTypes?.filter(
          (type: string) => type && type.trim() !== '',
        ) || undefined,
    };

    // Remove null, undefined, empty string, and empty array values
    const payload = Object.keys(rawPayload).reduce((acc: any, key: string) => {
      const value = rawPayload[key];
      if (
        value !== null &&
        value !== undefined &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        acc[key] = value;
      }
      return acc;
    }, {});

    mutate(payload);
  }, [
    data,
    findDiscography?.url,
    mutate,
    budgetAmount,
    totalAmount,
    cumulativeCost,
  ]);

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.BASE_PRIMARY}>
      <Header hasBackText="Checkout" onPressLeftIcon={goBack} />

      <ScrollView
        contentContainerStyle={{paddingBottom: hp(160)}}
        showsVerticalScrollIndicator={false}>
        <Box mt={hp(20)}>
          <Box
            px={wp(16)}
            pb={hp(10)}
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Text
              variant="bodyBold"
              fontFamily={theme.font.AvenirNextSemiBold}
              color={theme.colors.WHITE}>
              File Upload
            </Text>

            <Box
              as={TouchableOpacity}
              activeOpacity={0.8}
              onPress={() => setOpen('select-audio')}>
              <Text>Change File</Text>
            </Box>
          </Box>

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
                      Promotion Frequency
                    </Text>
                    <Text variant="bodyBold" color={theme.colors.WHITE}>
                      {data?.frequency}
                    </Text>
                  </Box>
                  <Box
                    flexDirection={'row'}
                    alignItems={'center'}
                    borderBottomWidth={1}
                    pb={2}
                    pt={hp(14)}
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
                    {formatNumberWithCommas(
                      budgetAmount?.toString() ||
                        cumulativeCost?.toString() ||
                        '0',
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
                    Service Fee (5%)
                  </Text>
                  <Text variant="bodyBold" color={theme.colors.WHITE}>
                    NGN{' '}
                    {formatNumberWithCommas(
                      serviceCharge?.toString() ||
                        (cumulativeCost * 0.05)?.toString() ||
                        '0',
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
                      totalAmount?.toString() ||
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
