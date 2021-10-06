import { useNavigation } from '@react-navigation/core';

import React from 'react';
import {
  Pressable,
  TextInput,
  TextInputProps,
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAppSelector } from '~/redux/hooks';
import { themeState } from '~/redux/theme/themeStateSlice';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_COLOR = '#FFF';
const ICON_SIZE = 23;

interface IHeader extends TextInputProps {
  value?: string | undefined;
  headerHeight: number;
  onChangeText?: ((text: string) => void) | undefined;
}

const Header = ({ headerHeight, ...props }: IHeader): JSX.Element => {
  const navigation = useNavigation();
  const { primaryColor } = useAppSelector(themeState);

  const height = headerHeight / 2;
  return (
    <>
      <View
        style={[styles.topHeader, { backgroundColor: primaryColor, height }]}
      >
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
      <View style={{ height }}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          placeholder="Search"
          style={styles.textInputStyle}
          {...props}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topHeader: {
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  textInputStyle: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    flex: 1,
    borderBottomWidth: 1,
  },
});

export default Header;
