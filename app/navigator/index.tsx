import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';

import { HomeScreen, OptionScreen, ThemeScreen } from '~/screens';

export type RootStackParamList = {
  Home: undefined;
  Option: undefined;
  Theme: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Option"
          component={OptionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Theme"
          component={ThemeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
