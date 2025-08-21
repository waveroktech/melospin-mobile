import React from 'react';
import {Header, Icon, Screen} from 'shared';
import theme from 'theme';
import {Box, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import {SectionList, TextInput} from 'react-native';
import {styles} from './style';
import {notifications} from 'data';

export const Notifications = () => {
  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.BASE_PRIMARY}>
      <Header hasBackText="Notifications" />

      <Box mt={hp(20)} mx={wp(16)}>
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
          contentContainerStyle={{marginTop: hp(20), paddingBottom: hp(100)}}
          sections={notifications}
          stickySectionHeadersEnabled={false}
          renderItem={({item}) => (
            <Box
              bg={theme.colors.OFF_BLACK_100}
              mt={hp(16)}
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
                {item.message}
              </Text>
            </Box>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Box
              mt={hp(16)}
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
        />
      </Box>
    </Screen>
  );
};
