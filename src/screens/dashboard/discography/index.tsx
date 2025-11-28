import React, {useCallback, useState, useMemo} from 'react';
import {Icon, Loader, Screen} from 'shared';
import {DashboardHeader} from '../home/components';
import {FlatList, Linking, TextInput, TouchableOpacity} from 'react-native';
import {EmptyPromotionContainer} from '../promotions/components';
import theme from 'theme';
import {DiscographyItem} from './component';
import {hp, wp} from 'utils';
import {Box, Button, Text} from 'design-system';
import {styles} from './style';
import {AddDiscography, AddedDiscography, ViewDiscography} from './modals';
import {useGetDiscography} from 'store';
import {useFocusEffect} from '@react-navigation/native';

export const Discography = () => {
  const [open, setOpen] = useState<
    'add-discography' | 'added-discography' | 'discography-details' | ''
  >('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentDiscography, setCurrentDiscography] = useState<any>(null);

  const {data, refetch, isPending} = useGetDiscography();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  // Filter discography items based on search query
  const filteredDiscography = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      return data.data;
    }

    return data.data.filter((item: any) => {
      // Search in title
      const title = item?.title?.toLowerCase() || '';
      if (title.includes(query)) {
        return true;
      }

      // Search in primary artiste
      const primaryArtiste = item?.primaryArtiste?.toLowerCase() || '';
      if (primaryArtiste.includes(query)) {
        return true;
      }

      // Search in other artistes array
      if (Array.isArray(item?.otherArtistes) && item.otherArtistes.length > 0) {
        const otherArtistes = item.otherArtistes
          .map((artist: string) => artist.toLowerCase())
          .join(' ');
        if (otherArtistes.includes(query)) {
          return true;
        }
      }

      return false;
    });
  }, [data?.data, searchQuery]);

  // Clear search function
  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

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
          placeholder="Search uploads"
          selectionColor={theme.colors.WHITE}
          placeholderTextColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          textContentType="none"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={clearSearch}
            activeOpacity={0.8}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{padding: 8}}>
            <Icon name="close-icon" />
          </TouchableOpacity>
        )}
      </Box>

      {searchQuery.length > 0 && (
        <Box mx={wp(16)} mt={hp(10)}>
          <Text
            variant="body"
            fontSize={12}
            color={theme.colors.TEXT_INPUT_PLACEHOLDER}>
            {filteredDiscography.length} file
            {filteredDiscography.length !== 1 ? 's' : ''} found
          </Text>
        </Box>
      )}

      <FlatList
        data={filteredDiscography}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(item, index) => `${item._id || item.id || index}`}
        renderItem={({item}) => (
          <DiscographyItem
            item={item}
            isPressable
            isDisco
            onPress={() => {
              setCurrentDiscography(item);
              setOpen('discography-details');
            }}
          />
        )}
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

      <ViewDiscography
        isVisible={open === 'discography-details'}
        onClose={() => setOpen('')}
        discography={currentDiscography}
      />

      <Loader loading={isPending} />
    </Screen>
  );
};
