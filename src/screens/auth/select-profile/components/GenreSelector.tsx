import React, {useEffect} from 'react';
import {Box, Text} from 'design-system';
import {capitalizeTitle, fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {TouchableOpacity} from 'react-native';
import {useGetGenre} from 'store/useGenre';
import {Icon} from 'shared';

interface GenreSelectorProps {
  selectedGenres: string[];
  onSelectGenre: (genreTitle: string) => void;
}

export const GenreSelector = ({
  selectedGenres,
  onSelectGenre,
}: GenreSelectorProps) => {
  const {data: musicGenres, refetch} = useGetGenre();

  console.log(musicGenres, 'musicGenres');

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Box
      bg={theme.colors.TEXT_INPUT_BG}
      pt={hp(12)}
      px={wp(16)}
      pb={hp(16)}
      borderRadius={hp(24)}>
      <Text variant="body" color={theme.colors.WHITE}>
        Select genre of music you specialize in
      </Text>
      <Box
        mt={hp(10)}
        flexDirection={'row'}
        alignItems={'center'}
        flexWrap={'wrap'}>
        {musicGenres?.data?.map((genre: {_id: string; title: string}) => {
          return (
            <Box
              key={genre?._id}
              flexDirection={'row'}
              alignItems={'center'}
              mr={2}
              py={2}
              onPress={() => onSelectGenre(genre?.title)}
              as={TouchableOpacity}
              activeOpacity={0.8}
              px={2}
              borderRadius={hp(24)}
              mb={10}
              bg={theme.colors.BASE_SECONDARY}>
              <Icon
                name={
                  selectedGenres?.includes(genre?.title)
                    ? 'active-checkbox'
                    : 'checkbox'
                }
              />
              <Text
                pl={2}
                variant="body"
                fontSize={fontSz(14)}
                color={theme.colors.WHITE}>
                {capitalizeTitle(genre?.title || '')}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
