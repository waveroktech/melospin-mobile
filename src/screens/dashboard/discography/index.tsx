import React, {useCallback, useState} from 'react';
import {Icon, Loader, Screen} from 'shared';
import {DashboardHeader} from '../home/components';
import {FlatList, TextInput} from 'react-native';
import {EmptyPromotionContainer} from '../promotions/components';
import theme from 'theme';
import {DiscographyItem} from './component';
import {hp, wp} from 'utils';
import {Box, Button} from 'design-system';
import {styles} from './style';
import {AddDiscography, AddedDiscography} from './modals';
import {useGetDiscography} from 'store';
import {useFocusEffect} from '@react-navigation/native';

export const Discography = () => {
  const [open, setOpen] = useState<
    'add-discography' | 'added-discography' | ''
  >('');

  const {data, refetch, isPending} = useGetDiscography();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const onComplete = async () => {
    setOpen('');
    setTimeout(() => {
      setOpen('added-discography');
    }, 500);
  };

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.BASE_PRIMARY}>
      <DashboardHeader title="Discography" />
      <Box mt={hp(20)} mx={wp(16)} style={styles.searchInputContainer}>
        <Icon name="search-icon" />
        <TextInput
          style={styles.searchTextInput}
          placeholder="Search by audio file name"
          selectionColor={theme.colors.WHITE}
          placeholderTextColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
        />
      </Box>

      <FlatList
        data={data?.data}
        renderItem={({item}) => <DiscographyItem item={item} />}
        ListEmptyComponent={
          <EmptyPromotionContainer
            containerStyles={{my: hp(220)}}
            icon="empty-folder"
            title="No Files Uploaded"
            subTitle="You can view all audio files as soon as they are uploaded your library"
          />
        }
      />

      <Button
        hasBorder
        isNotBottom
        position={'absolute'}
        bottom={hp(150)}
        width={wp(160)}
        onPress={() => setOpen('add-discography')}
        right={wp(20)}
        title="Upload New"
        iconName="arrow-right-3"
      />

      <AddDiscography
        isVisible={open === 'add-discography'}
        onClose={() => setOpen('')}
        onComplete={onComplete}
      />

      <AddedDiscography
        isVisible={open === 'added-discography'}
        onClose={() => setOpen('')}
      />

      <Loader loading={isPending} />
    </Screen>
  );
};
