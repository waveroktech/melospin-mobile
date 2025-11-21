import React, {useEffect, useState} from 'react';
import {Box, Text} from 'design-system';
import {hp, wp} from 'utils';
import {FlatList, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {Icon} from 'shared';
import theme from 'theme';
import {styles} from './style';
import {PromotionItem} from './PromotionItem';
import {useGetPromotionRequests} from 'store';
import {EmptyPromotionContainer} from './EmptyPromotionContainer';
import {promotions} from 'data';
import {OngoingPromotionDetails, PromotionDetails} from '../modals';
import {showMessage} from 'react-native-flash-message';

export const BookingHistory = () => {
  const {data: djPromotions, refetch} = useGetPromotionRequests();
  const [open, setOpen] = useState<
    'promotion-details' | 'ongoing-promotion-details' | ''
  >('');

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Box mt={hp(20)}>
      <ScrollView>
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

          <Box height={hp(500)}>
            <FlatList
              contentContainerStyle={{
                marginTop: hp(20),
                paddingBottom: hp(100),
              }}
              // data={djPromotions?.data}
              data={promotions}
              renderItem={({item}) => {
                return (
                  <PromotionItem
                    promotion={item}
                    onPress={() =>
                      item.status === 'Pending approval'
                        ? setOpen('promotion-details')
                        : setOpen('ongoing-promotion-details')
                    }
                  />
                );
              }}
              ListEmptyComponent={
                <EmptyPromotionContainer
                  icon="empty-folder"
                  containerStyles={{my: hp(100)}}
                  title="No Promotions"
                  subTitle="You do not have any available promotions"
                />
              }
            />
          </Box>
        </Box>
      </ScrollView>

      <PromotionDetails
        isVisible={open === 'promotion-details'}
        onClose={() => setOpen('')}
        onAccept={() => {
          setOpen('');
          setTimeout(() => {
            showMessage({
              message: 'Promotion accepted',
              type: 'success',
            });
          }, 1000);
        }}
      />

      <OngoingPromotionDetails
        isVisible={open === 'ongoing-promotion-details'}
        onClose={() => setOpen('')}
      />
    </Box>
  );
};
