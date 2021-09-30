import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default {
  /**
   * App level constants
   */
  WINDOW_WIDTH: screenWidth,
  WINDOW_HEIGHT: screenHeight,
  borderRadius: 8,
  textInputHeight: 40,
  /**
   * Appbar constants
   */
  appbarButtonHeight: 23,
  thinLineBorder: 2,
  tableHeight: 56,
  tableWidth: 56,
  appbarTopHeight: 60,
};
