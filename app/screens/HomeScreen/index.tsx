import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import React, { useEffect } from 'react';
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
  fetchCurrencyByCode,
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
  const rates = conversionSelector.conversion_rates || {};
  const lastConvertedDate = conversionSelector.time_last_update_utc
    ? new Date(conversionSelector.time_last_update_utc)
    : new Date();

  const handlePressBaseCurrency = () => {
    navigation.navigate('CurrencyList', {
      title: 'Base Currency',
      type: 'base',
    });
  };

  const handlePressQuoteCurrency = () => {
    navigation.navigate('CurrencyList', {
      title: 'Quote Currency',
      type: 'quote',
    });
  };

  const swipeCurrency = async () => {
    await dispatch(fetchCurrencyByCode(quoteCurrency));
    dispatch(onSwapCurrency());
  };

  useEffect(() => {
    const base_code = baseCurrency ?? 'USD';
    dispatch(fetchCurrencyByCode(base_code));
  }, []);

  const quotePrice = (amount * rates[quoteCurrency] || 0).toFixed(2) ?? '...';
  return (
    <Container
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <Header onPress={() => navigation.navigate('Option')} />
      <KeyboardAvoidingView behavior="padding">
        <Logo tintColor={primaryColor} />
        <InputWithButton
          buttonText={baseCurrency}
          onPress={handlePressBaseCurrency}
          defaultValue={amount.toString()}
          keyboardType="numeric"
          onChangeText={text => dispatch(onChangeCurrencyAmount(Number(text)))}
          textColor={primaryColor}
        />
        <InputWithButton
          onPress={handlePressQuoteCurrency}
          editable={false}
          buttonText={quoteCurrency}
          value={quotePrice}
          textColor={primaryColor}
        />
        <LastConverted
          date={lastConvertedDate}
          base={baseCurrency}
          quote={quoteCurrency}
          conversionRate={rates[quoteCurrency] || 0}
        />
        <ClearButton onPress={swipeCurrency} text="Reverse Currencies" />
      </KeyboardAvoidingView>
    </Container>
  );
}
