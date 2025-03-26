import React from 'react';
import {Box, Text} from 'design-system';
import {hp, wp} from 'utils';
import {ScrollView} from 'react-native';

export const BookingHistory = () => {
  return (
    <Box mt={hp(20)}>
      <ScrollView>
        <Box mt={hp(20)} mx={wp(16)}></Box>
      </ScrollView>
    </Box>
  );
};
