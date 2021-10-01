import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import React from 'react';
import { StatusBar, KeyboardAvoidingView } from 'react-native';

import { ClearButton } from '~/components/common/Button';
import { Container } from '~/components/common/Container';
import { Header } from '~/components/common/Header';
import { Logo } from '~/components/common/Logo';
import { LastConverted } from '~/components/common/Text';
import { InputWithButton } from '~/components/common/TextInput';
import { RootStackParamList } from '~/navigator';
import {
  currenciesState,
  onChangeCurrencyAmount,
  onSwapCurrency,
} from '~/redux/currencies/currenciesStateSlice';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { themeState } from '~/redux/theme/themeStateSlice';

export type HomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export default function HomeScreen(): JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const dispatch = useAppDispatch();
  const { primaryColor } = useAppSelector(themeState);
  const { baseCurrency, quoteCurrency, conversions, amount } =
    useAppSelector(currenciesState);

  const conversionSelector = conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};
  const lastConvertedDate = conversionSelector.date
    ? new Date(conversionSelector.date)
    : new Date();
  const isFetching = conversionSelector.isFetching;

  let quotePrice = '...';

  if (!isFetching) {
    quotePrice = (amount * rates[quoteCurrency] || 0).toFixed(2);
  }
  return (
    <Container backgroundColor={primaryColor}>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <Header onPress={() => navigation.navigate('Option')} />
      <KeyboardAvoidingView behavior="padding">
        <Logo tintColor={primaryColor} />
        <InputWithButton
          buttonText={baseCurrency}
          onPress={() => console.log('')}
          defaultValue={amount.toString()}
          keyboardType="numeric"
          onChangeText={text => dispatch(onChangeCurrencyAmount(Number(text)))}
          textColor={primaryColor}
        />
        <InputWithButton
          editable={false}
          buttonText={quoteCurrency}
          onPress={() => {
            console.log('aa');
          }}
          value={quotePrice}
          textColor={primaryColor}
        />
        <LastConverted
          date={lastConvertedDate}
          base={baseCurrency}
          quote={quoteCurrency}
          conversionRate={rates[quoteCurrency] || 0}
        />
        <ClearButton
          onPress={() => dispatch(onSwapCurrency())}
          text="Reverse Currencies"
        />
      </KeyboardAvoidingView>
    </Container>
  );
}
