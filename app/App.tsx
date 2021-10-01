import { PersistGate } from 'redux-persist/es/integration/react';

import React from 'react';
import { StyleSheet, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider as StoreProvider } from 'react-redux';

import RootNavigator from '~/navigator';
import configureStore from '~/redux/store';
import { ThemeProvider } from '~/theme/ThemeContext';

const { persistor, store } = configureStore();

EStyleSheet.build({
  $primaryBlue: '#4F6D7A',
  $primaryOrange: '#D57A66',
  $primaryGreen: '#00BD9D',
  $primaryPurple: '#9E768F',

  $white: '#FFFFFF',
  $lightGray: '#F0F0F0',
  $border: '#E2E2E2',
  $inputText: '#797979',
  $darkText: '#343434',
});

export default function App(): JSX.Element {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <SafeAreaView style={styles.container}>
            <RootNavigator />
          </SafeAreaView>
        </ThemeProvider>
      </PersistGate>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
