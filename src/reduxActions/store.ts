import { combineReducers, createStore, Store } from 'redux';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthReducer from './auth/authReducer';
import ItemReducer from './item/itemReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  item: ItemReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

let store: Store;

export function getStore(): Store<RootState> {
  if (!store) {
    store = createStore(persistedReducer);
  }
  return store;
}

export function persistor(): Persistor{
  return persistStore(store);
}