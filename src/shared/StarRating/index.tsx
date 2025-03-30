import {Box} from 'design-system';
import React from 'react';
import {Icon} from 'shared/Icon';
import {hp, wp} from 'utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
}

const StarRating: React.FC<StarRatingProps> = ({rating, maxRating = 5}) => {
  return (
    <Box flexDirection={'row'} mt={hp(2)} alignItems={'center'}>
      {[...Array(maxRating)].map((_, index) => (
        <Box key={index} mr={wp(1)}>
          <Icon name={index < rating ? 'active-rating' : 'rating'} />
        </Box>
      ))}
    </Box>
  );
};

export default StarRating;
