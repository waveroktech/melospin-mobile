import {TextProps as RNTextProps} from 'react-native';
import styled from '@emotion/native';
import {
  color,
  ColorProps,
  compose,
  flexbox,
  FlexboxProps,
  fontSize,
  FontSizeProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
  variant as styledVariant,
} from 'styled-system';
import theme, {Theme} from 'theme';

export interface TextProps
  extends ColorProps,
    FlexboxProps,
    FontSizeProps,
    LayoutProps,
    PositionProps,
    SpaceProps,
    RNTextProps,
    TypographyProps {
  variant?: keyof Theme['typography'];
}

const TextOptions = compose(
  styledVariant({
    prop: 'variant',
    scale: 'typography',
    variants: {
      base: {},
    },
  }),
  color,
  flexbox,
  fontSize,
  layout,
  position,
  space,
  typography,
);

const Text = styled.Text<TextProps>(TextOptions);

Text.defaultProps = {
  color: theme.colors.PRIMARY,
  variant: 'body',
};

Text.displayName = 'Text';

export {Text};
export default Text;
