import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';

export interface IExchangeRateResult {
  result?: string;
  documentation?: string;
  terms_of_use?: string;
  time_last_update_unix: Date;
  time_last_update_utc: Date;
  time_next_update_unix: Date;
  time_next_update_utc: Date;
  base_code: string;
  conversion_rates: {
    [key: string]: number;
  };
}
export interface ICurrenciesState {
  status: string;
  baseCurrency: string;
  quoteCurrency: string;
  amount: number;
  conversions: {
    [key: string]: IExchangeRateResult;
  };
}

const initialState: ICurrenciesState = {
  status: '',
  baseCurrency: 'USD',
  quoteCurrency: 'GBP',
  amount: 100,
  conversions: {
    USD: {
      result: 'success',
      time_last_update_unix: new Date(),
      time_last_update_utc: new Date(),
      time_next_update_unix: new Date(),
      time_next_update_utc: new Date(),
      base_code: 'USD',
      conversion_rates: {
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

const setConversions = (
  state: ICurrenciesState,
  conversion: IExchangeRateResult,
) => {
  if (state.conversions[conversion.base_code]) {
    const copyConversions = { ...state.conversions };
    copyConversions[conversion.base_code] = conversion;
    return {
      ...copyConversions,
    };
  } else {
    return {
      ...state.conversions,
      [conversion.base_code]: conversion,
    };
  }
};

export const fetchCurrencyByCode = createAsyncThunk(
  'exchangerate/fetchCurrencyByCode',
  async (currency_code: string) => {
    const API_KEY = 'ac52a84b35e64f29d2a16466';
    const currencyResponse = await axios.get<IExchangeRateResult>(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency_code}`,
    );
    return currencyResponse.data;
  },
);

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
    changeQuoteCurrency: (state, action: PayloadAction<string>) => {
      state.quoteCurrency = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCurrencyByCode.fulfilled, (state, action) => {
      state.baseCurrency = action.payload.base_code;
      state.conversions = setConversions(state, action.payload);
    });
  },
});

export const { onChangeCurrencyAmount, onSwapCurrency, changeQuoteCurrency } =
  currenciesStateSlice.actions;

export const currenciesState = (state: RootState): ICurrenciesState =>
  state.currenciesState;

export default currenciesStateSlice.reducer;
