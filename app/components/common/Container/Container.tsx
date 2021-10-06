import PropTypes from 'prop-types';

import React from 'react';
import { StatusBar, StyleProp, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppSelector } from '~/redux/hooks';
import { themeState } from '~/redux/theme/themeStateSlice';

import styles from './styles';

interface ContainerProps {
  children: React.ReactNode;
  header?: React.ReactChild;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

const Container = ({
  children,
  header,
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
      <StatusBar translucent={false} barStyle="light-content" />
      <View style={style && style}>
        {header && <View>{header}</View>}
        {children}
      </View>
    </SafeAreaView>
  );
};

Container.propTypes = {
  children: PropTypes.any,
  backgroundColor: PropTypes.string,
};

export default Container;
