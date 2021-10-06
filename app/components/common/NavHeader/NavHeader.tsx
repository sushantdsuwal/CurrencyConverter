import { useNavigation } from '@react-navigation/core';

import React from 'react';
import { Platform, Pressable, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_COLOR = '#FFF';
const ICON_SIZE = 23;

export default function NavHeader(): JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      >
        <Ionicons
          name={`${ICON_PREFIX}-arrow-back`}
          size={ICON_SIZE}
          color={ICON_COLOR}
        />
      </Pressable>
    </View>
  );
}
