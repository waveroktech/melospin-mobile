import {ScrollViewProps, TouchableOpacityProps, ViewProps} from 'react-native';
import styled from '@emotion/native';
import {
  border,
  BorderProps,
  color,
  ColorProps,
  compose,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from 'styled-system';

interface CustomScrollViewProps extends Omit<ScrollViewProps, 'hitSlop'> {}

interface CustomViewProps extends Omit<ViewProps, 'hitSlop'> {}

interface CustomTouchableOpacityProps
  extends Omit<TouchableOpacityProps, 'hitSlop'> {}

export interface BoxProps
  extends BorderProps,
    ColorProps,
    FlexboxProps,
    LayoutProps,
    PositionProps,
    CustomScrollViewProps,
    SpaceProps,
    CustomTouchableOpacityProps,
    CustomViewProps {}

const BoxOptions = compose(border, color, flexbox, layout, position, space);
const Box = styled.View<BoxProps>(BoxOptions);

Box.displayName = 'Box';

export {Box};

export default Box;
