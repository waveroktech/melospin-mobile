import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Box} from 'design-system';
import {isAndroid} from 'utils';
import theme from 'theme';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  backgroundColor?: string;
  removeSafeaArea?: boolean;
  opacity?: number;
}

export const Screen = ({
  children,
  backgroundColor,
  removeSafeaArea,
  opacity,
}: Props) => {
  const {top} = useSafeAreaInsets();

  return (
    <>
      {removeSafeaArea ? (
        <Box
          backgroundColor={backgroundColor}
          flex={1}
          opacity={opacity || 1}
          pt={isAndroid ? top + 10 : top}>
          <StatusBar
            backgroundColor={theme.colors.PRIMARY}
            translucent
            barStyle={'light-content'}
          />
          {children}
        </Box>
      ) : (
        <Box backgroundColor={backgroundColor} flex={1} as={SafeAreaView}>
          <StatusBar
            backgroundColor={theme.colors.PRIMARY}
            translucent
            barStyle={'light-content'}
          />
          {children}
        </Box>
      )}
    </>
  );
};
