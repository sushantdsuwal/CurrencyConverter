import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../store';

export interface IConversions {
  conversions: {
    [key: string]: {
      isFetching?: boolean;
      base: string;
      date: string;
      rates: {
        [key: string]: number;
      };
    };
  };
}

export interface ICurrenciesState extends IConversions {
  baseCurrency: string;
  quoteCurrency: string;
  amount: number;
}

const initialState: ICurrenciesState = {
  baseCurrency: 'USD',
  quoteCurrency: 'GBP',
  amount: 100,
  conversions: {
    USD: {
      isFetching: false,
      base: 'USD',
      date: '2017-05-31',
      rates: {
        AUD: 1.3416,
        BGN: 1.743,
        BRL: 3.2515,
        CAD: 1.3464,
        CHF: 0.97104,
        CNY: 6.813,
        CZK: 23.547,
        DKK: 6.6302,
        GBP: 0.77858,
        HKD: 7.7908,
        HRK: 6.6068,
        HUF: 273.77,
        IDR: 13308,
        ILS: 3.5431,
        INR: 64.463,
        JPY: 110.86,
        KRW: 1118.4,
        MXN: 18.765,
        MYR: 4.281,
        NOK: 8.4117,
        NZD: 1.4071,
        PHP: 49.77,
        PLN: 3.7173,
        RON: 4.0687,
        RUB: 56.774,
        SEK: 8.6942,
        SGD: 1.3829,
        THB: 34.07,
        TRY: 3.5366,
        ZAR: 13.133,
        EUR: 0.89119,
      },
    },
  },
};

const setConversions = (state: any, action: any) => {
  let conversion = {
    isFetching: true,
    date: '',
    rates: {},
  };

  if (state.conversions[action.currency]) {
    conversion = state.conversions[action.payload.baseCurrency];
  }

  return {
    ...state.conversions,
    [action.payload.baseCurrency]: conversion,
  };
};

export const currenciesStateSlice = createSlice({
  name: 'currenciesState',
  initialState,
  reducers: {
    onChangeCurrencyAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload || 0;
    },
    onSwapCurrency: state => {
      return {
        ...state,
        baseCurrency: state.quoteCurrency,
        quoteCurrency: state.baseCurrency,
      };
    },
    changeBaseCurrency: (state, action: PayloadAction<ICurrenciesState>) => {
      state.baseCurrency = action.payload.baseCurrency;
      state.conversions = setConversions(state, action);
    },
    changeQuoteCurrency: (state, action: PayloadAction<ICurrenciesState>) => {
      state.quoteCurrency = action.payload.quoteCurrency;
      state.conversions = setConversions(state, action);
    },
  },
});

export const {
  onChangeCurrencyAmount,
  onSwapCurrency,
  changeBaseCurrency,
  changeQuoteCurrency,
} = currenciesStateSlice.actions;

export const currenciesState = (state: RootState): ICurrenciesState =>
  state.currenciesState;

export default currenciesStateSlice.reducer;
