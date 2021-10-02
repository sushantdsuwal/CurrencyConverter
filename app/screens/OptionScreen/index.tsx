import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import React from 'react';
import { ScrollView, StatusBar, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Container } from '~/components/common/Container';
import { ListItem, Separator } from '~/components/common/List';
import { RootStackParamList } from '~/navigator';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_COLOR = '#868686';
const ICON_SIZE = 23;

export type HomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Option'
>;

export default function OptionScreen(): JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  return (
    <Container>
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <ListItem
          text="Themes"
          onPress={() => navigation.navigate('Theme')}
          customIcon={
            <Ionicons
              name={`${ICON_PREFIX}-arrow-forward`}
              size={ICON_SIZE}
              color={ICON_COLOR}
            />
          }
        />
        <Separator />
      </ScrollView>
    </Container>
  );
}
