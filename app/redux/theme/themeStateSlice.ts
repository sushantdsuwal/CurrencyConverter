import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export interface IThemeState {
  primaryColor: string;
}

const initialState: IThemeState = {
  primaryColor: '#4F6D7A',
};

export const appStateSlice = createSlice({
  name: 'themeState',
  initialState,
  reducers: {
    onChangePrimaryColor: (state, action: PayloadAction<IThemeState>) => {
      return { ...state, primaryColor: action.payload.primaryColor };
    },
  },
});

export const { onChangePrimaryColor } = appStateSlice.actions;
export const themeState = (state: RootState): IThemeState => state.themeState;

export default appStateSlice.reducer;
