import PropTypes from 'prop-types';

import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppSelector } from '~/redux/hooks';
import { themeState } from '~/redux/theme/themeStateSlice';

import styles from './styles';

interface ContainerProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const Container = ({
  children,
  backgroundColor,
}: ContainerProps): JSX.Element => {
  const { primaryColor } = useAppSelector(themeState);

  const containerStyles = [styles.container, { backgroundColor: primaryColor }];
  if (backgroundColor) {
    containerStyles.push({ backgroundColor });
  } else {
    containerStyles.push({ backgroundColor: primaryColor });
  }

  return <SafeAreaView style={containerStyles}>{children}</SafeAreaView>;
};

Container.propTypes = {
  children: PropTypes.any,
  backgroundColor: PropTypes.string,
};

export default Container;
