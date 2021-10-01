import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { ScrollView, StatusBar, Platform, Linking } from 'react-native';

import { ListItem, Separator } from '~/components/common/List';
import { RootStackParamList } from '~/navigator';

export type HomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Option'
>;

export default function OptionScreen(): JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  return (
    <ScrollView>
      <StatusBar translucent={false} barStyle="default" />
      <ListItem
        text="Themes"
        onPress={() => navigation.navigate('Theme')}
        // customIcon={
        //   <Ionicons name={`${ICON_PREFIX}-arrow-forward`} size={ICON_SIZE} color={ICON_COLOR} />
        // }
      />
      <Separator />
    </ScrollView>
  );
}
