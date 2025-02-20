import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';

import { apiService } from '@/services/auth/authCreateApi';
import authReducer from '@/services/auth/authSlice';
import languageReducer from '@/store/slices/languageSlice';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['authSlice', 'language'],
};

const rootReducer = combineReducers({
  authSlice: authReducer,
  language: languageReducer,
  [apiService.reducerPath]: apiService.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(apiService.middleware),
});

export const persistStor = persistStore(store);
