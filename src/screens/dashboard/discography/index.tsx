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
  const [searchQuery, setSearchQuery] = useState<string>('');

  const {data, refetch, isPending} = useGetDiscography();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  // Filter discography items based on search query
  const filteredDiscography =
    data?.data?.filter((item: any) => {
      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();
      const fileName = item?.name?.toLowerCase() || '';

      return fileName.includes(query);
    }) || [];

  const onComplete = async () => {
    setOpen('');
    setTimeout(() => {
      setOpen('added-discography');
    }, 500);
  };

  const onClose = async () => {
    refetch();
    setTimeout(() => {
      setOpen('');
    }, 400);
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
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Box>

      <FlatList
        data={filteredDiscography}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({item}) => <DiscographyItem item={item} />}
        ListEmptyComponent={
          <EmptyPromotionContainer
            containerStyles={{my: hp(220)}}
            icon="empty-folder"
            title={searchQuery.trim() ? 'No Files Found' : 'No Files Uploaded'}
            subTitle={
              searchQuery.trim()
                ? "Try adjusting your search terms to find what you're looking for"
                : 'You can view all audio files as soon as they are uploaded your library'
            }
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
        onClose={onClose}
      />

      <Loader loading={isPending} />
    </Screen>
  );
};
