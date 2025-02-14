import {Box, Button, Text} from 'design-system';
import React, {useState} from 'react';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import {Header, HeaderText, Icon, Screen} from 'shared';
import theme from 'theme';
import {hp, wp} from 'utils';
import {styles} from './style';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'types';

const profiles = [
  {
    id: '1',
    title: 'Artiste Profile',
    description:
      'I am an Artiste or music promoter who wants to promote their music and connect with DJs',
    image: theme.images.artist,
  },
  {
    id: '2',
    title: 'DJ Profile',
    description:
      'I am a DJ looking for artists to collaborate with and play their music',
    image: theme.images.dj,
  },
];

export const SelectProfile = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {navigate} = useNavigation<NavigationProp<AuthStackParamList>>();
  // Ensure styles update when index changes

  const handleSelectProfile = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.PRIMARY}>
      <Header hasBackButton goBackText="Go back" />
      <HeaderText
        hasHeaderText="Set up profile"
        hasSubText="Select profile type to customize your experience"
        width={wp(330)}
      />
      <FlatList
        data={profiles}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingHorizontal: wp(16),
          marginTop: hp(80),
        }}
        renderItem={({item, index}) => {
          if (selectedIndex === index) {
            return (
              <Box
                as={TouchableOpacity}
                activeOpacity={0.8}
                style={styles.activeProfileContainer}
                onPress={() => handleSelectProfile(index)}>
                <Image source={item?.image} style={styles.image} />
                <Text style={styles.profileText}>{item?.title}</Text>
              </Box>
            );
          } else {
            return (
              <Box
                as={TouchableOpacity}
                activeOpacity={0.8}
                onPress={() => handleSelectProfile(index)}
                style={[styles.inactiveProfileContainer]}>
                <Image source={item?.image} style={styles.inactiveImage} />
                <Text style={styles.profileText}>{item?.title}</Text>
              </Box>
            );
          }
        }}
      />

      <Box position={'absolute'} bottom={hp(180)}>
        <Text style={styles.descriptionText}>
          {profiles[selectedIndex]?.description}
        </Text>
      </Box>

      <Box alignSelf={'center'} position={'absolute'} bottom={hp(110)}>
        <Icon name="swiper-icon" />
      </Box>
      <Button
        title="Next"
        onPress={() => navigate('SetupProfile')}
        hasBorder
        bg={theme.colors.PRIMARY_100}
      />
    </Screen>
  );
};
