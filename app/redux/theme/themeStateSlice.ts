import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export interface IThemeState {
  primaryColor: string;
}

const initialState: IThemeState = {
  primaryColor: '#4F6D7A',
};

export const themeStateSlice = createSlice({
  name: 'themeState',
  initialState,
  reducers: {
    onChangePrimaryColor: (state, action: PayloadAction<string>) => {
      return { ...state, primaryColor: action.payload };
    },
  },
});

export const { onChangePrimaryColor } = themeStateSlice.actions;
export const themeState = (state: RootState): IThemeState => state.themeState;

export default themeStateSlice.reducer;
