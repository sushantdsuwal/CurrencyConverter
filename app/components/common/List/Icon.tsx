import PropTypes from 'prop-types';
import React from 'react';
import { View, Image } from 'react-native';

import styles from './styles';

interface IconProps {
  visible?: boolean;
  checkmark?: boolean;
  iconBackground?: string;
}

const Icon = ({ visible, checkmark, iconBackground }:IconProps): JSX.Element => {
  if (visible) {
    const iconStyles = [styles.icon];
    if (visible) {
      iconStyles.push(styles.iconVisible);
    }
    if (iconBackground) {
      iconStyles.push({ backgroundColor: iconBackground });
    }
    return (
      <View style={iconStyles}>
        {checkmark
          ? <Image
            source={require('./images/check.png')}
            style={styles.checkIcon}
            resizeMode="contain"
          />
          : null}
      </View>
    );
  }

  return <View style={styles.icon} />;
};

Icon.propTypes = {
  visible: PropTypes.bool,
  checkmark: PropTypes.bool,
  iconBackground: PropTypes.string,
};

export default Icon;
