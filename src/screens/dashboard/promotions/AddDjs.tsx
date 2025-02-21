import React from 'react';
import {Box, Button, Text} from 'design-system';
import {Header, HeaderText, Icon, Screen} from 'shared';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {FlatList, TouchableOpacity} from 'react-native';
import {DjPromoItem, EmptyPromotionContainer} from './components';

export const AddDjs = () => {
  return (
    <Screen removeSafeaArea>
      <Header hasBackText="Set up Promotion" />

      <HeaderText
        hasHeaderText="Fill Audio details for promotion"
        hasHeaderTextStyle={{fontSize: fontSz(14)}}
        hasIndicatorLevel
        currentPage={2}
      />

      <Box
        mt={hp(60)}
        justifyContent={'space-between'}
        alignItems={'center'}
        px={wp(10)}
        as={TouchableOpacity}
        activeOpacity={0.8}
        borderColor={theme.colors.ACCENT_04}
        flexDirection={'row'}
        alignSelf={'center'}
        width={wp(119)}
        height={hp(40)}
        borderRadius={hp(24)}
        borderWidth={1}>
        <Text
          variant="bodyMedium"
          fontSize={fontSz(16)}
          color={theme.colors.WHITE}>
          Add DJs
        </Text>
        <Icon name="arrow-right-2" />
      </Box>

      <Box
        borderBottomWidth={1}
        pt={hp(40)}
        mx={wp(16)}
        borderBottomColor={theme.colors.BASE_SECONDARY}
      />

      <Box mt={hp(24)}>
        <Text
          px={wp(16)}
          variant="body"
          fontSize={fontSz(14)}
          color={theme.colors.WHITE}>
          DJs on Promo List
        </Text>
        <FlatList
          data={[]}
          renderItem={({item, index}) => <DjPromoItem dj={item} key={index} />}
          ListEmptyComponent={
            <EmptyPromotionContainer
              icon="headphones"
              containerStyles={{my: hp(40)}}
              title="No DJs added"
              subTitle="DJs available for promotions will appear here as you add them to list"
            />
          }
        />
      </Box>

      <Button title="Continue" hasBorder bg={theme.colors.PRIMARY_100} />
    </Screen>
  );
};
