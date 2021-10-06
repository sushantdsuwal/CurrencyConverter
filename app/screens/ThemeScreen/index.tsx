import { useNavigation } from '@react-navigation/core';

import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Container } from '~/components/common/Container';
import { ListItem, Separator } from '~/components/common/List';
import { NavHeader } from '~/components/common/NavHeader';
import { useAppDispatch } from '~/redux/hooks';
import { onChangePrimaryColor } from '~/redux/theme/themeStateSlice';

const styles = EStyleSheet.create({
  $blue: '$primaryBlue',
  $orange: '$primaryOrange',
  $green: '$primaryGreen',
  $purple: '$primaryPurple',
});

export default function ThemeScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handlePressTheme = (color: string) => {
    dispatch(onChangePrimaryColor(color));
    navigation.goBack();
  };

  return (
    <Container header={<NavHeader />}>
      <ScrollView>
        <ListItem
          text="Blue"
          onPress={() => handlePressTheme(styles.$blue)}
          selected
          checkmark={false}
          iconBackground={styles.$blue}
        />
        <Separator />
        <ListItem
          text="Orange"
          onPress={() => handlePressTheme(styles.$orange)}
          selected
          checkmark={false}
          iconBackground={styles.$orange}
        />
        <Separator />
        <ListItem
          text="Green"
          onPress={() => handlePressTheme(styles.$green)}
          selected
          checkmark={false}
          iconBackground={styles.$green}
        />
        <Separator />
        <ListItem
          text="Purple"
          onPress={() => handlePressTheme(styles.$purple)}
          selected
          checkmark={false}
          iconBackground={styles.$purple}
        />
        <Separator />
      </ScrollView>
    </Container>
  );
}
