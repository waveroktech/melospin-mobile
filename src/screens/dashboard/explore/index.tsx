import React from 'react';
import {Screen} from 'shared';
import {DashboardHeader} from '../home/components';

export const Explore = () => {
  return (
    <Screen removeSafeaArea>
      <DashboardHeader title="Explore" />
    </Screen>
  );
};
