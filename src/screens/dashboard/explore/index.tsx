import React from 'react';
import {AvoidingView, Icon, Screen} from 'shared';
import {DashboardHeader} from '../home/components';
import {FlatList, ScrollView, TextInput} from 'react-native';
import {ConnectDjItem, ExploreHeaderContainer} from './components';
import theme from 'theme';
import {Box, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import {styles} from './style';
import {djs} from 'data';

export const Explore = () => {
  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.BASE_PRIMARY}>
      <DashboardHeader title="Explore" />

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
              placeholder="Search by name e.g djzenzee"
              selectionColor={theme.colors.WHITE}
              placeholderTextColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
            />
          </Box>

          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            data={djs}
            numColumns={2}
            renderItem={({item}) => <ConnectDjItem item={item} />}
          />
        </ScrollView>
      </AvoidingView>
    </Screen>
  );
};
