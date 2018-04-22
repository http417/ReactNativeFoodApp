import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import reducerUser from './reducers/reducerUser';
import reducerFoodStore from './reducers/reducerFoodStore';
import dataManager from '../tools/dataFetch';
import actions from './actions';

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

export const fetchMenuData = () => {
  dataManager.processData
    .then((processedData) => {
      store.dispatch(actions.refreshMenu(processedData));
    })
    .catch((error) => {
      console.log("Problem fetching data to initialize redux store: ", error);
    });
};
