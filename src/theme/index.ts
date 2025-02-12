import {colors} from './colors';
import {font} from './font';
import {typography} from './typography';
import {images} from './images';

const theme = {
  images,
  colors,
  font,
  typography,
};

export type Theme = typeof theme;

export default theme;
