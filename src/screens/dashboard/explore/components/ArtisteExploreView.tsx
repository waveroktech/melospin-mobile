import React from 'react';
import {AvoidingView, Icon} from 'shared';
import {FlatList, ScrollView, TextInput} from 'react-native';
import {ExploreHeaderContainer} from './ExploreHeaderContainer';
import theme from 'theme';
import {Box, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import {styles} from '../style';
import {ConnectDjItem} from './ConnectDjItem';
import {EmptyPromotionContainer} from '../../promotions/components';

interface ArtisteListEmptyComponentProps {
  search: string;
}

const ArtisteListEmptyComponent = ({
  search,
}: ArtisteListEmptyComponentProps) => {
  if (search) {
    return (
      <EmptyPromotionContainer
        icon="empty-folder"
        title="No DJs found"
        containerStyles={{my: hp(20)}}
        subTitle="Please try again with a different search"
      />
    );
  }
  return (
    <EmptyPromotionContainer
      icon="empty-folder"
      title="No DJs found"
      containerStyles={{my: hp(20)}}
      subTitle="There are no DJs available at the moment"
    />
  );
};

const createEmptyComponent = (search: string) => () =>
  <ArtisteListEmptyComponent search={search} />;

interface ArtisteExploreViewProps {
  filteredData: any[];
  search: string;
  onSearchChange: (text: string) => void;
}

export const ArtisteExploreView = ({
  filteredData,
  search,
  onSearchChange,
}: ArtisteExploreViewProps) => {
  return (
    <AvoidingView>
      <ScrollView>
        <ExploreHeaderContainer />

        <Box
          flexDirection={'row'}
          alignItems={'center'}
          mx={wp(20)}
          mt={hp(20)}>
          <Icon name="explore-dj" />
          <Text
            pl={wp(10)}
            variant="bodyMedium"
            fontSize={fontSz(14)}
            color={theme.colors.WHITE}>
            Explore DJs
          </Text>
        </Box>

        <Box mt={hp(20)} style={styles.searchInputContainer}>
          <Icon name="search-icon" />
          <TextInput
            style={styles.searchTextInput}
            onChangeText={onSearchChange}
            placeholder="Search by name e.g djzenzee"
            selectionColor={theme.colors.WHITE}
            placeholderTextColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
          />
        </Box>

        <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          data={filteredData}
          numColumns={2}
          renderItem={({item}) => <ConnectDjItem item={item} />}
          ListEmptyComponent={createEmptyComponent(search)}
        />
      </ScrollView>
    </AvoidingView>
  );
};
