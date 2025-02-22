import React, {useState} from 'react';
import {Box, Text} from 'design-system';
import {GradientBorderView} from '@good-react-native/gradient-border';
import {styles} from './style';
import {fontSz, hp, wp} from 'utils';
import theme from 'theme';
import {Image, TouchableOpacity} from 'react-native';
import {Icon} from 'shared';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {DashboardStackParamList} from 'types';
import {useMelospinStore} from 'store';

interface DashboardHeaderProps {
  title: string;
}

export const DashboardHeader = ({title}: DashboardHeaderProps) => {
  const [open, setOpen] = useState<'profile-options' | ''>('');
  const {navigate} = useNavigation<NavigationProp<DashboardStackParamList>>();

  const {logoutUser} = useMelospinStore();

  const handleLogout = () => {
    setOpen('');
    setTimeout(() => {
      logoutUser();
    }, 400);
  };

  const handleUserProfile = () => {
    setOpen('');
    setTimeout(() => {
      navigate('Profile');
    }, 400);
  };
  return (
    <>
      <Box
        mx={wp(16)}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Text
          variant="bodyMedium"
          fontSize={fontSz(20)}
          color={theme.colors.WHITE}>
          {title}
        </Text>

        <Box
          flexDirection={'row'}
          alignItems={'center'}
          width={wp(80)}
          justifyContent={'space-between'}>
          <Box
            as={TouchableOpacity}
            activeOpacity={0.8}
            onPress={() =>
              open === 'profile-options'
                ? setOpen('')
                : setOpen('profile-options')
            }>
            <GradientBorderView
              gradientProps={{
                colors: ['#FFFFFF', '#D73C3C', '#8932F7'],
              }}
              style={styles.gradientContainer}>
              <Image
                source={theme.images.artist}
                style={styles.imageContainer}
              />
            </GradientBorderView>
          </Box>
          <Icon name="notification" />
        </Box>
      </Box>

      {open === 'profile-options' && (
        <Box
          position={'absolute'}
          zIndex={1000}
          right={wp(16)}
          top={hp(40)}
          p={hp(12)}
          borderWidth={0.5}
          borderColor={theme.colors.TEXT_INPUT_PLACEHOLDER}
          borderTopLeftRadius={hp(16)}
          borderBottomLeftRadius={hp(16)}
          borderBottomRightRadius={hp(16)}
          width={wp(145)}
          height={hp(112)}
          bg={theme.colors.BLACK_DEFAULT}>
          <Box
            height={hp(40)}
            as={TouchableOpacity}
            activeOpacity={0.8}
            px={wp(12)}
            onPress={handleUserProfile}
            flexDirection={'row'}
            alignItems={'center'}
            mb={10}>
            <Icon name="profile" />
            <Text
              pl={2}
              variant="body"
              fontSize={fontSz(14)}
              color={theme.colors.WHITE}>
              My Profile
            </Text>
          </Box>
          <Box
            height={hp(40)}
            px={wp(12)}
            as={TouchableOpacity}
            activeOpacity={0.8}
            onPress={handleLogout}
            flexDirection={'row'}
            alignItems={'center'}
            bg={theme.colors.BASE_SECONDARY}
            borderRadius={hp(12)}>
            <Icon name="logout" />
            <Text
              pl={2}
              variant="body"
              fontSize={fontSz(14)}
              color={theme.colors.LIGHT_PRIMARY}>
              Log Out
            </Text>
          </Box>
        </Box>
      )}
    </>
  );
};
