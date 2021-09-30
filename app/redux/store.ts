import rootReducer from './rootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['crewmember', 'tipReports'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function config() {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: thunk,
        },
        serializableCheck: false,
      }),
    // middleware: [thunk],
  });
  const persistor = persistStore(store);
  return {persistor, store};
}
const {store} = config();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default config;
