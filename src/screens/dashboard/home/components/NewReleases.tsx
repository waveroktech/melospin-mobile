import React from 'react';
import {Box, Text} from 'design-system';
import {hp} from 'utils';
import theme from 'theme';
import {ScrollView} from 'react-native';
import {styles} from '../style';
import {ReleaseItem} from './ReleaseItem';
import {EmptyPromotionContainer} from '../../promotions/components';

interface NewReleasesProps {
  releases?: any[];
}

export const NewReleases = ({releases = []}: NewReleasesProps) => {
  return (
    <Box
      borderBottomWidth={1}
      mt={hp(20)}
      borderBottomColor={theme.colors.BASE_SECONDARY}
      pb={hp(20)}>
      <Text
        variant="bodyMedium"
        fontFamily={theme.font.AvenirNextSemiBold}
        color={theme.colors.WHITE}>
        New Releases
      </Text>

      {releases?.length === 0 && (
        <EmptyPromotionContainer
          icon="empty-folder"
          containerStyles={{my: hp(50), mb: hp(20)}}
          title="No Releases Available"
        />
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {releases?.map((release, index) => {
          return <ReleaseItem release={release} key={index} />;
        })}
      </ScrollView>
    </Box>
  );
};
