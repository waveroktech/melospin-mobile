import React from 'react';
import {Box} from 'design-system';
import {hp, wp} from 'utils';
import {TrendingNow} from './TrendingNow';
import {NewReleases} from './NewReleases';
import {DjsOnDeck} from './DjsOnDeck';

interface ArtisteHomeProps {
  djs?: any[];
  releases?: any[];
}

export const ArtisteHome: React.FC<ArtisteHomeProps> = ({
  djs,
  releases = [],
}) => {
  return (
    <Box mt={hp(30)} mx={wp(16)}>
      <TrendingNow />

      <NewReleases releases={releases} />

      <DjsOnDeck djs={djs} />
    </Box>
  );
};
