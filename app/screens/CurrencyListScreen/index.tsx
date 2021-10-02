import { useNavigation } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import React from 'react';
import { FlatList, StatusBar, View } from 'react-native';

import { ListItem, Separator } from '~/components/common/List';
import { RootStackParamList } from '~/navigator';
import {
  changeBaseCurrency,
  changeQuoteCurrency,
  currenciesState,
} from '~/redux/currencies/currenciesStateSlice';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { themeState } from '~/redux/theme/themeStateSlice';

type CurrencyListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CurrencyList'
>;

export default function CurrencyListScreen({
  route,
}: CurrencyListScreenProps): JSX.Element {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { baseCurrency, quoteCurrency, conversions } =
    useAppSelector(currenciesState);
  const { primaryColor } = useAppSelector(themeState);

  const { type } = route.params;

  const handlePress = (currency: string) => {
    const { type } = route.params;
    if (type === 'base') {
      // dispatch(changeBaseCurrency(currency));
    } else if (type === 'quote') {
      dispatch(changeQuoteCurrency(currency));
    }
    navigation.goBack();
  };

  let comparisonCurrency = baseCurrency;
  if (type === 'quote') {
    comparisonCurrency = quoteCurrency;
  }
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={false} barStyle="default" />
      <FlatList
        data={Object.keys(conversions[baseCurrency].rates)}
        renderItem={({ item }) => (
          <ListItem
            text={item}
            selected={item === comparisonCurrency}
            onPress={() => handlePress(item)}
            iconBackground={primaryColor}
          />
        )}
        keyExtractor={item => item}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
}
