import React, {useState} from 'react';
import {Box, Button, Text} from 'design-system';
import {Header, HeaderText, Icon, Screen} from 'shared';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {BackHandler, FlatList, TouchableOpacity} from 'react-native';
import {DjPromoItem, EmptyPromotionContainer} from './components';
import {SelectDjs} from './modals';
import {djs} from 'data';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {DashboardStackParamList} from 'types';

export const AddDjs = () => {
  const [open, setOpen] = useState<'select-dj' | ''>('');

  const {navigate, goBack} =
    useNavigation<NavigationProp<DashboardStackParamList>>();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (open === 'select-dj') {
          setOpen(''); // Handle modal close
          return true; // Prevent screen from going back
        }
        return false; // Allow default navigation
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => backHandler.remove();
    }, [open]),
  );

  return (
    <Screen removeSafeaArea>
      <Header hasBackText="Set up Promotion" onPressLeftIcon={goBack} />
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
        onPress={() => setOpen('select-dj')}
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
        <Box height={hp(500)}>
          <FlatList
            data={djs?.slice(0, 4)}
            renderItem={({item, index}) => (
              <DjPromoItem dj={item} key={index} />
            )}
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
      </Box>

      <Button
        title="Continue"
        onPress={() => navigate('PromotionBudget')}
        hasBorder
        bg={theme.colors.PRIMARY_100}
      />

      <SelectDjs isVisible={open === 'select-dj'} onClose={() => setOpen('')} />
    </Screen>
  );
};
