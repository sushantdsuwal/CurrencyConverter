import PropTypes from 'prop-types';

import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppSelector } from '~/redux/hooks';
import { themeState } from '~/redux/theme/themeStateSlice';

import styles from './styles';

interface ContainerProps {
  children: React.ReactNode;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

const Container = ({
  children,
  style,
  backgroundColor,
}: ContainerProps): JSX.Element => {
  const { primaryColor } = useAppSelector(themeState);

  const containerStyles = [styles.container, { backgroundColor: primaryColor }];
  if (backgroundColor) {
    containerStyles.push({ backgroundColor });
  } else {
    containerStyles.push({ backgroundColor: primaryColor });
  }

  return (
    <SafeAreaView style={containerStyles}>
      <View style={style && style}>{children}</View>
    </SafeAreaView>
  );
};

Container.propTypes = {
  children: PropTypes.any,
  backgroundColor: PropTypes.string,
};

export default Container;
