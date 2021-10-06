import { useNavigation } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  StyleSheet,
} from 'react-native';

import { Container } from '~/components/common/Container';
import { ListItem, Separator } from '~/components/common/List';
import { RootStackParamList } from '~/navigator';
import {
  changeQuoteCurrency,
  currenciesState,
  fetchCurrencyByCode,
} from '~/redux/currencies/currenciesStateSlice';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { themeState } from '~/redux/theme/themeStateSlice';
import { getCloser } from '~/utils';

import AnimatedSearchHeader from './AnimatedSearchHeader';

type CurrencyListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CurrencyList'
>;

const { diffClamp } = Animated;
const headerHeight = 58 * 2;

export default function CurrencyListScreen({
  route,
}: CurrencyListScreenProps): JSX.Element {
  const { type } = route.params;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { baseCurrency, quoteCurrency, conversions } =
    useAppSelector(currenciesState);
  const { primaryColor } = useAppSelector(themeState);
  //
  const [currencyList, setCurrencyList] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -(headerHeight / 2)],
  });

  const flatListRef = useRef<FlatList>(null);
  const translateYNumber = useRef(null);

  translateY.addListener(({ value }) => {
    translateYNumber.current = value;
  });

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: scrollY.current },
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const handleSnap = ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => {
    const offsetY = nativeEvent.contentOffset.y;
    if (
      !(
        translateYNumber?.current === 0 ||
        translateYNumber?.current === -headerHeight / 2
      )
    ) {
      if (flatListRef.current) {
        flatListRef.current?.scrollToOffset({
          offset:
            getCloser(translateYNumber.current ?? 0, -headerHeight / 2, 0) ===
            -headerHeight / 2
              ? offsetY + headerHeight / 2
              : offsetY - headerHeight / 2,
        });
      }
    }
  };

  useEffect(() => {
    if (searchQuery === '') {
      setCurrencyList(Object.keys(conversions[baseCurrency].conversion_rates));
    } else {
      const currencies = Object.keys(
        conversions[baseCurrency].conversion_rates,
      );
      const searchResult = currencies.filter(currency => {
        const query = searchQuery.toLowerCase();
        return currency.toLowerCase().indexOf(query) > -1;
      });
      setCurrencyList(searchResult);
    }
  }, [searchQuery]);

  const getCurrencyList = async (currency_code: string) => {
    dispatch(fetchCurrencyByCode(currency_code));
  };

  const handlePress = (currency: string) => {
    const { type } = route.params;
    if (type === 'base') {
      getCurrencyList(currency);
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
    <Container
      header={
        <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
          <AnimatedSearchHeader
            {...{ headerHeight }}
            value={searchQuery}
            onChangeText={queryText => setSearchQuery(queryText)}
          />
        </Animated.View>
      }
    >
      <Animated.FlatList
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: headerHeight }}
        onScroll={handleScroll}
        ref={flatListRef}
        onMomentumScrollEnd={handleSnap}
        data={currencyList}
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
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1,
  },
});
