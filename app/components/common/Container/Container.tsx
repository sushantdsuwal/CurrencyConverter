import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import styles from './styles';

interface ContainerProps {
  children: React.ReactNode;
  backgroundColor: string;
}

const Container = ({ children, backgroundColor }:ContainerProps): JSX.Element => {
  const containerStyles = [styles.container];
  if (backgroundColor) {
    containerStyles.push({ backgroundColor });
  }
  return (
    <View style={containerStyles}>
      {children}
    </View>
  );
};

Container.propTypes = {
  children: PropTypes.any,
  backgroundColor: PropTypes.string,
};

export default Container;
