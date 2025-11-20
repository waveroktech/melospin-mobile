import React, {useEffect, useMemo} from 'react';
import {Box, Text} from 'design-system';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useGetGenre} from 'store/useGenre';
import {Icon} from 'shared';

interface GenresProps {
  genres: string[];
  onChange?: (selectedGenres: string[]) => void;
}

export const Genres = ({genres, onChange}: GenresProps) => {
  const {data: musicGenres, refetch} = useGetGenre();

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Use genres prop as selected genres (from user signup)
  const selectedGenres = genres || [];

  const selectGenre = (genreTitle: string) => {
    if (!onChange) {
      return; // If no onChange, it's display-only
    }

    const updatedSelection = selectedGenres.includes(genreTitle)
      ? selectedGenres.filter(g => g !== genreTitle)
      : [...selectedGenres, genreTitle];
    onChange(updatedSelection);
  };

  const handleSelectAll = () => {
    if (!onChange) {
      return; // If no onChange, it's display-only
    }

    const allGenreTitles =
      musicGenres?.data?.map(
        (genre: {_id: string; title: string}) => genre.title,
      ) || [];
    const allSelected = allGenreTitles.every((title: string) =>
      selectedGenres.includes(title),
    );

    if (allSelected) {
      // Deselect all
      onChange([]);
    } else {
      // Select all
      onChange(allGenreTitles);
    }
  };

  // Get all genre titles from API
  const allGenreTitles =
    musicGenres?.data?.map(
      (genre: {_id: string; title: string}) => genre.title,
    ) || [];
  const allSelected =
    allGenreTitles.length > 0 &&
    allGenreTitles.every((title: string) => selectedGenres.includes(title));

  // Sort genres alphabetically
  const sortedGenres = useMemo(() => {
    if (!musicGenres?.data) {
      return [];
    }
    return [...musicGenres.data].sort((a, b) => {
      const titleA = a.title?.toLowerCase() || '';
      const titleB = b.title?.toLowerCase() || '';
      return titleA.localeCompare(titleB);
    });
  }, [musicGenres?.data]);

  if (!musicGenres?.data || sortedGenres.length === 0) {
    return null;
  }

  return (
    <Box mt={hp(26)} mb={hp(24)}>
      <Text
        variant="body"
        pb={hp(12)}
        fontSize={fontSz(14)}
        color={theme.colors.WHITE}>
        Genres
      </Text>
      <Box
        bg={theme.colors.TEXT_INPUT_BG}
        borderRadius={hp(24)}
        px={wp(16)}
        py={hp(12)}>
        <Box
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Text variant="body" fontSize={fontSz(14)} color={theme.colors.WHITE}>
            Select music genre
          </Text>

          {onChange && (
            <Box
              as={TouchableOpacity}
              activeOpacity={0.8}
              onPress={handleSelectAll}>
              <Text
                variant="body"
                fontSize={fontSz(14)}
                color={theme.colors.LIGHT_PRIMARY}
                style={styles.textDecoration}>
                {allSelected ? 'Unselect all' : 'Select all'}
              </Text>
            </Box>
          )}
        </Box>

        <Box flexDirection={'row'} flexWrap={'wrap'} mt={hp(16)}>
          {sortedGenres.map((genre: {_id: string; title: string}) => {
            const isSelected = selectedGenres.includes(genre.title);
            return (
              <Box
                key={genre._id}
                flexDirection={'row'}
                alignItems={'center'}
                onPress={() => selectGenre(genre.title)}
                as={onChange ? TouchableOpacity : undefined}
                activeOpacity={onChange ? 0.8 : 1}
                px={wp(12)}
                py={2}
                borderRadius={hp(24)}
                mr={wp(10)}
                mb={hp(12)}
                bg={theme.colors.BASE_SECONDARY}>
                <Icon name={isSelected ? 'active-checkbox' : 'checkbox'} />
                <Text
                  variant="body"
                  fontSize={fontSz(14)}
                  color={theme.colors.WHITE}
                  pl={wp(2)}>
                  {genre.title}
                </Text>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  textDecoration: {
    textDecorationLine: 'underline',
  },
});
