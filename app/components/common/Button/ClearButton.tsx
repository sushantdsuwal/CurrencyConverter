import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';

import styles from './styles';

interface ClearButtonProps {
  text: string;
  onPress: () => void,
}

const ClearButton = ({ text, onPress }:ClearButtonProps): JSX.Element => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.wrapper}>
      <Image resizeMode="contain" style={styles.icon} source={require('./images/icon.png')} />
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);

ClearButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
};

export default ClearButton;
