import {Platform} from 'react-native';
import {hasNotch, hasDynamicIsland} from 'react-native-device-info';

const isAndroid = Platform.OS === 'android';
const isIos = Platform.OS === 'ios';
const isWeb = Platform.OS === 'web';

const deviceHasNotch = hasNotch();
const deviceHasDynamicIsland = hasDynamicIsland();

export {isAndroid, isIos, isWeb, deviceHasNotch, deviceHasDynamicIsland};
