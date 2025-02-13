import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { apiService } from '../services/auth/authCreateApi';
import authReducer from '../services/auth/authSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Persist only the auth slice
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    persistedReducer, // use the persisted reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore serializable check for persisted actions
      },
    }).concat(apiService.middleware),
});

export const persistStor = persistStore(store);
