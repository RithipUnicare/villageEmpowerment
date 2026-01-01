import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const responsiveWidth = (percent: number) => wp(percent);
export const responsiveHeight = (percent: number) => hp(percent);

export const fontScale = (size: number) => {
  // A simple heuristic for font scaling based on screen width
  const baseWidth = 375; // iPhone 11/X width
  return (wp(size) * baseWidth) / 100 / size;
};
