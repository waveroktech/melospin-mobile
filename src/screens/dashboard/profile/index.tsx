import React from 'react';
import {Box, Button, Text} from 'design-system';
import {Screen} from 'shared';
import theme from 'theme';
import {useMelospinStore} from 'store';

export const Profile = () => {
  const {setIsLoggedIn} = useMelospinStore();
  return (
    <Screen removeSafeaArea>
      <Box>
        <Text variant="body" color={theme.colors.WHITE}>
          Profile
        </Text>
      </Box>
      <Button
        title="Log out"
        bg={theme.colors.PRIMARY_100}
        onPress={() => setIsLoggedIn(false)}
      />
    </Screen>
  );
};
