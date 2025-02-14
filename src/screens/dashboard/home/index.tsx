import React from 'react';
import {Box, Text} from 'design-system';
import {Screen} from 'shared';
import theme from 'theme';

export const Home = () => {
  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.PRIMARY}>
      <Box>
        <Text>Home</Text>
      </Box>
    </Screen>
  );
};
