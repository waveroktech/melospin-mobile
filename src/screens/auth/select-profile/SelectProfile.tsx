import {Box, Button, Text} from 'design-system';
import React, {useState} from 'react';
import {Animated, Image, TouchableOpacity} from 'react-native';
import {Header, HeaderText, Icon, Screen} from 'shared';
import theme from 'theme';
import {deviceWidth, hp, wp} from 'utils';
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

const ITEM_WIDTH = deviceWidth * 0.6; // Active item width
const CENTER_OFFSET = (deviceWidth - ITEM_WIDTH) / 2; // Center the first item

export const SelectProfile = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {navigate} = useNavigation<NavigationProp<AuthStackParamList>>();
  // Ensure styles update when index changes

  const handleScrollEnd = (event: {
    nativeEvent: {contentOffset: {x: number}};
  }) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
    setSelectedIndex(index);
  };

  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <Screen removeSafeaArea backgroundColor={theme.colors.PRIMARY}>
      <Header hasBackButton goBackText="Go back" />
      <HeaderText
        hasHeaderText="Set up profile"
        hasSubText="Select profile type to customize your experience"
        width={wp(330)}
      />

      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: CENTER_OFFSET,
          marginTop: hp(40),
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        onMomentumScrollEnd={handleScrollEnd} // Detect final active item
      >
        {profiles.map((item, index) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
          });

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [hp(20), 0, -hp(20)],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.activeProfileContainer,
                {
                  transform: [{scale}, {translateX}],
                },
              ]}>
              <Box as={TouchableOpacity} activeOpacity={0.8}>
                <Image source={item?.image} style={styles.image} />
                <Text style={styles.profileText}>{item?.title}</Text>
              </Box>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>

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
        onPress={() =>
          navigate('SetupProfile', {
            accountType: selectedIndex === 0 ? 'artiste' : 'dj',
          })
        }
        hasBorder
        bg={theme.colors.PRIMARY_100}
      />
    </Screen>
  );
};
