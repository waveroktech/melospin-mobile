import React, {useEffect, useMemo, useCallback} from 'react';
import {Header, Icon, Loader, Screen} from 'shared';
import theme from 'theme';
import {Box, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import {SectionList, TextInput} from 'react-native';
import {styles} from './style';
import {useGetNotifications} from 'store';
import {Notification} from 'services/api/notification.service';

interface NotificationSection {
  title: string;
  data: Notification[];
}

export const Notifications = () => {
  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useGetNotifications();

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Group notifications by date
  const sections = useMemo<NotificationSection[]>(() => {
    if (!data?.pages) {
      return [];
    }

    // Flatten all notifications from all pages
    const allNotifications = data.pages.flatMap(page => page.data || []);

    // Group by date
    const groupedByDate: {[key: string]: Notification[]} = {};

    allNotifications.forEach(notification => {
      const date = new Date(notification.createdAt);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let dateKey: string;

      // Check if it's today
      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        dateKey = 'Today';
      }
      // Check if it's yesterday
      else if (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
      ) {
        dateKey = 'Yesterday';
      }
      // Otherwise format as "MMM DD, YYYY"
      else {
        dateKey = date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      }

      if (!groupedByDate[dateKey]) {
        groupedByDate[dateKey] = [];
      }
      groupedByDate[dateKey].push(notification);
    });

    // Convert to sections array and sort by date (newest first)
    return Object.keys(groupedByDate)
      .map(dateKey => ({
        title: dateKey,
        data: groupedByDate[dateKey],
      }))
      .sort((a, b) => {
        // Sort sections: Today > Yesterday > Other dates
        if (a.title === 'Today') {
          return -1;
        }
        if (b.title === 'Today') {
          return 1;
        }
        if (a.title === 'Yesterday') {
          return -1;
        }
        if (b.title === 'Yesterday') {
          return 1;
        }
        return (
          new Date(b.data[0].createdAt).getTime() -
          new Date(a.data[0].createdAt).getTime()
        );
      });
  }, [data?.pages]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.BASE_PRIMARY}>
      <Header hasBackText="Notifications" />

      <Box mt={hp(20)}>
        <Box style={styles.searchInputContainer}>
          <Icon name="search-icon" />
          <TextInput
            style={styles.searchTextInput}
            placeholder="Search"
            selectionColor={theme.colors.WHITE}
            placeholderTextColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
          />
        </Box>

        <SectionList
          contentContainerStyle={{marginTop: hp(20), paddingBottom: hp(200)}}
          sections={sections}
          stickySectionHeadersEnabled={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          keyExtractor={(item, index) => item._id || `notification-${index}`}
          renderItem={({item}) => (
            <Box
              bg={theme.colors.OFF_BLACK_100}
              mt={hp(16)}
              mx={wp(16)}
              p={hp(12)}
              borderRadius={hp(24)}>
              <Box flexDirection={'row'} alignItems={'center'}>
                <Icon name="notification-icon" />
                <Text
                  variant="bodyMedium"
                  pl={wp(12)}
                  fontFamily={theme.font.AvenirNextMedium}
                  color={theme.colors.WHITE}
                  fontSize={fontSz(14)}>
                  {item.title}
                </Text>
              </Box>

              <Text
                variant="bodyMedium"
                pt={hp(12)}
                fontFamily={theme.font.AvenirNextMedium}
                color={theme.colors.TEXT_INPUT_PLACEHOLDER}
                fontSize={fontSz(12)}>
                {item.meta?.content || ''}
              </Text>
            </Box>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Box
              mt={hp(16)}
              mx={wp(16)}
              borderBottomWidth={1}
              borderBottomColor={theme.colors.BASE_SECONDARY}
              pb={hp(16)}>
              <Text
                variant="bodyMedium"
                fontSize={fontSz(16)}
                fontFamily={theme.font.AvenirNextSemiBold}
                color={theme.colors.WHITE}>
                {title}
              </Text>
            </Box>
          )}
          ListFooterComponent={
            isFetchingNextPage ? (
              <Box py={hp(20)} alignItems="center">
                <Loader loading={true} />
              </Box>
            ) : null
          }
        />
      </Box>

      <Loader loading={isPending} />
    </Screen>
  );
};
