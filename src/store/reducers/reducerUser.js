
import { combineReducers } from 'redux';
import { REFRESH_MENU, PURGE_CART, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, UPDATE_USER_PHONE, SIGN_OUT, SIGN_IN } from '../../constants/constants';

const phoneReducer = (state = '', action) => {
  switch (action.type) {
    case UPDATE_USER_PHONE:
      return action.number;
    default:
      return state;
  }
};

const authTokenReducer = (state = '', action) => {
  switch (action.type) {
    case SIGN_IN:
      return action.token;
    case SIGN_OUT:
      return '';
    default:
      return state;
  }
};

const initialCartState = {
  items: {
    // id: quantity
  },
  totalCost: 0,
  totalItems: 0,
};

const itemsReducer = (state = {}, action) => {
  switch (action.type) {
    case PURGE_CART: {
      return {};
    }
    case ADD_ITEM_TO_CART: {
      const updatedItems = { ...state };
      // first check to see if item is already in cart, if so then add to its quantity
      if (action.id in updatedItems) {
        updatedItems[action.id] += 1;
      } else {
        // if items isn't in cart, then add it
        updatedItems[action.id] = 1;
      }
      return updatedItems;
    }
    case REMOVE_ITEM_FROM_CART: {
      const updatedItems = { ...state };
      // first check to see if item is already in cart, if so then subtract its quantity
      if (action.id in updatedItems) {
        if (updatedItems[action.id] <= 1) {
          delete updatedItems[action.id]; // or remove completely
        } else {
          updatedItems[action.id] -= 1;
        }
      }
      return updatedItems;
    }
    default: {
      return state;
    }
  }
};

const totalCostReducer = (state = 0, action) => {
  switch (action.type) {
    case PURGE_CART: {
      return 0;
    }
    case ADD_ITEM_TO_CART: {
      return state + action.cost;
    }
    case REMOVE_ITEM_FROM_CART: {
      return state - action.cost;
    }
    case REFRESH_MENU: { // ensure the cart's prices are up to date
      return action.totalCartCost;
    }
    default: {
      return state;
    }
  }
};

const totalItemsReducer = (state = 0, action) => {
  switch (action.type) {
    case PURGE_CART: {
      return 0;
    }
    case ADD_ITEM_TO_CART: {
      return state + 1;
    }
    case REMOVE_ITEM_FROM_CART: {
      return state - 1;
    }
    default: {
      return state;
    }
  }
};

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case PURGE_CART: {
      return initialCartState;
    }
    case ADD_ITEM_TO_CART: {
      return ({
        items: itemsReducer(state.items, action),
        totalCost: totalCostReducer(state.totalCost, action),
        totalItems: totalItemsReducer(state.totalItems, action),
      });
    }
    case REMOVE_ITEM_FROM_CART: {
      return ({
        items: itemsReducer(state.items, action),
        totalCost: totalCostReducer(state.totalCost, action),
        totalItems: totalItemsReducer(state.totalItems, action),
      });
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  cart: cartReducer,
  authToken: authTokenReducer,
  phone: phoneReducer,
});
