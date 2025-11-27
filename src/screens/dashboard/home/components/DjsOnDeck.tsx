import React from 'react';
import {Box, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {Image, ScrollView} from 'react-native';
import {styles} from '../style';

interface DjsOnDeckProps {
  djs?: any[];
}

export const DjsOnDeck = ({djs = []}: DjsOnDeckProps) => {
  return (
    <Box mt={hp(20)}>
      <Text
        variant="bodyMedium"
        fontSize={fontSz(16)}
        color={theme.colors.WHITE}>
        DJs on deck
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {djs?.length &&
          djs?.slice(0, 4)?.map((dj: any, index: number) => {
            return (
              <Box
                key={index}
                mt={hp(10)}
                width={wp(86)}
                mr={wp(10)}
                justifyContent={'center'}
                alignItems={'center'}
                height={hp(84)}>
                <Image
                  source={theme.images['dj-images']['dj-1']}
                  style={styles.djProfile}
                />
                <Text
                  variant="bodyMedium"
                  pt={1}
                  fontFamily={theme.font.AvenirNextSemiBold}
                  fontSize={fontSz(12)}
                  numberOfLines={1}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{textTransform: 'capitalize'}}
                  color={theme.colors.WHITE}>
                  {dj?.name}
                </Text>
              </Box>
            );
          })}
      </ScrollView>
    </Box>
  );
};

