import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import reducerUser from './reducers/reducerUser';
import reducerFoodStore from './reducers/reducerFoodStore';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

const myPersistReducer = () => persistReducer(persistConfig, combineReducers({
  user: reducerUser,
  foodStore: reducerFoodStore,
}));

export const store = createStore(myPersistReducer());
export const persistor = persistStore(store);
