import React from 'react';
import {Box} from 'design-system';
import {Header, HeaderText, Screen} from 'shared';
import {fontSz} from 'utils';
import {FileUpload} from './components';

export const AddPromotion = () => {
  return (
    <Screen removeSafeaArea>
      <Header hasBackText="Set up Promotion" />

      <HeaderText
        hasHeaderText="Fill Audio details for promotion"
        hasHeaderTextStyle={{fontSize: fontSz(14)}}
        hasIndicatorLevel
      />

      <FileUpload />
    </Screen>
  );
};
