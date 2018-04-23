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


// ******************************************************************************************* //

//                          EXAMPLE VISUALIZATION OF THE REDUX STORE

// ******************************************************************************************* //


const justForShow = () => ({ // eslint-disable-line
  user: {
    authToken: '', // if empty, user is signed out, else they are signed in, (and phone number is token)
    phone: '', // not in use right now
    cart: {
      'id-k235kj': 3, // { itemId: quantity  } total price and total items are calculated dynamically by the UI
    },
    foodStore: {
      refreshTracking: { lastRefreshDate: '', refreshInProgress: false }, // used to prevent unecessary refreshing
      categoryDetails: [ // basically the a subset of the raw category data fetched from server
        {
          id: 'id-23kj',
          name: 'Sandwiches',
        },
      ],
      // a lookup data structure for category page to easily grab list of associated items
      categorytoMainsHash: {
        'id-23kj': ['235231sdfsdf', '353j32523'],
      },
      mainItemDetails: {
        // id: {name, price, description}
        'id-3j2kjld': {
          name: 'Chicken Fingers',
          price: 1299, // price is in cents, to reduce javascript rounding issues
          description: 'battered diabetes sauted with diahrea',
        },
      },
    },
  },
});

