import {RootState} from '../store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IAppState {
  loading: boolean;
}

const initialState: IAppState = {
  loading: false,
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setLoadingIndicator: (state, action: PayloadAction<IAppState>) => {
      state.loading = action.payload.loading;
    },
  },
});

export const {
  setLoadingIndicator,
  setOfflineStatus,
  setErrorStatus,
  closeErrorModal,
  updateUnassignedTipsBadge,
} = appStateSlice.actions;
export const appState = (state: RootState): IAppState => state.appState;

export default appStateSlice.reducer;
