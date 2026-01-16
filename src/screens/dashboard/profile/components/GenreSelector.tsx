import React from 'react';
import {Box, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import {Image, TouchableOpacity} from 'react-native';
import theme from 'theme';
import {useGetGenre} from 'store/useGenre';
import {styles} from '../modals/style';

interface GenreSelectorProps {
  selectedGenres: string[];
  onGenreSelect: (genreTitle: string) => void;
}

export const GenreSelector = ({
  selectedGenres,
  onGenreSelect,
}: GenreSelectorProps) => {
  const {data: musicGenres} = useGetGenre();

  return (
    <Box
      bg={theme.colors.TEXT_INPUT_BG}
      pt={hp(12)}
      px={wp(16)}
      mb={hp(20)}
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
              onPress={() => onGenreSelect(genre?.title)}
              as={TouchableOpacity}
              activeOpacity={0.8}
              px={2}
              borderRadius={hp(24)}
              mb={10}
              bg={theme.colors.BASE_SECONDARY}>
              <Image
                source={
                  selectedGenres?.includes(genre.title)
                    ? theme.images.icons['active-tick']
                    : theme.images.icons['inactive-tick']
                }
                style={styles.icon}
              />
              <Text
                pl={2}
                variant="body"
                fontSize={fontSz(14)}
                color={theme.colors.WHITE}>
                {genre?.title}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
