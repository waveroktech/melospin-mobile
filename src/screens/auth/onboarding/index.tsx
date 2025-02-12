import React, {useRef, useState} from 'react';
import {Box, Button, Text} from 'design-system';
import {Icon} from 'shared';
import theme from 'theme';
import {onboardingData} from 'data';
import {Image, ImageBackground, ScrollView} from 'react-native';
import {styles} from './style';
import {
  deviceHasDynamicIsland,
  deviceHasNotch,
  deviceWidth,
  hp,
  wp,
} from 'utils';

export const Onboarding = () => {
  const [sliderState, setSliderState] = useState({currentPage: 0});

  const {currentPage: pageIndex} = sliderState;
  const scrollRef = useRef<ScrollView>(null);

  const setSliderPage = (event: any) => {
    const {currentPage} = sliderState;
    const {x} = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.round(x / deviceWidth);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  return (
    <Box flex={1}>
      <Box
        position={'absolute'}
        top={deviceHasNotch || deviceHasDynamicIsland ? hp(60) : hp(40)}
        zIndex={100000}
        left={wp(20)}>
        <Icon name="melospin-icon" />
      </Box>

      <Box
        zIndex={10000}
        top={deviceHasNotch || deviceHasDynamicIsland ? hp(110) : hp(80)}
        alignSelf={'center'}
        justifyContent={'space-between'}
        position={'absolute'}
        alignItems={'center'}
        flexDirection={'row'}>
        {Array.from(Array(onboardingData?.length).keys()).map((key, index) => (
          <Box
            width={wp(165)}
            height={2}
            borderRadius={pageIndex === index ? hp(12) : 100}
            ml={2}
            backgroundColor={
              pageIndex === index
                ? theme.colors.WHITE
                : theme.colors.BASE_SECONDARY
            }
            key={index}
          />
        ))}
      </Box>
      <ScrollView
        onScroll={event => {
          setSliderPage(event);
        }}
        ref={scrollRef}
        decelerationRate={'fast'}
        scrollEventThrottle={16}
        bounces={false}
        horizontal
        pagingEnabled>
        {onboardingData?.map((data, index) => {
          return (
            <Box width={deviceWidth} key={index}>
              <ImageBackground
                style={styles.bgContainer}
                source={data?.bgImage}>
                <Box
                  justifyContent={'center'}
                  alignItems={'center'}
                  mt={hp(100)}>
                  <Image
                    source={data?.image}
                    resizeMode="cover"
                    style={styles.onboardingImage}
                  />
                </Box>
                <Box px={wp(20)} bottom={hp(30)}>
                  <Text style={styles.titleText}>{data?.title}</Text>
                  <Text style={styles.descriptionText}>
                    {data?.description}
                  </Text>
                  <Image
                    source={theme.images['artist-list']}
                    style={styles.artistList}
                    resizeMode="contain"
                  />
                </Box>
              </ImageBackground>
            </Box>
          );
        })}
      </ScrollView>

      {pageIndex === 0 ? (
        <Button
          title="Next"
          hasBorder
          onPress={() => scrollRef?.current?.scrollToEnd()}
        />
      ) : (
        <Box
          position={'absolute'}
          bottom={0}
          mx={wp(16)}
          width={deviceWidth - wp(16)}
          flexDirection={'row'}>
          <Button
            width={wp(160)}
            hasBorder
            borderColor="#FFFFFF26"
            bg={'transparent'}
            title="Login"
            fontStyle={{paddingLeft: wp(2)}}
            buttonStyle={{borderTopWidth: hp(1)}}
          />
          <Button
            width={wp(160)}
            title="Sign up"
            hasBorder
            fontStyle={{paddingLeft: wp(2)}}
            containerStyle={{right: wp(20)}}
          />
        </Box>
      )}
    </Box>
  );
};
