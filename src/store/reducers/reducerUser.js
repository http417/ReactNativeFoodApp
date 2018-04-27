
import { combineReducers } from 'redux';
import { PURGE_CART, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, UPDATE_USER_PHONE, CLEAR_AUTH_TOKEN, STORE_AUTH_TOKEN } from '../../tools/constants';

const phoneReducer = (state = '', action) => {
  switch (action.type) {
    case UPDATE_USER_PHONE:
      return action.number;
    default:
      return state;
  }
};

export const authTokenReducer = (state = '', action) => {
  switch (action.type) {
    case STORE_AUTH_TOKEN:
      return action.token;
    case CLEAR_AUTH_TOKEN:
      return '';
    default:
      return state;
  }
};



export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case PURGE_CART: {
      return {};
    }
    case ADD_ITEM_TO_CART: {
      const updatedItems = { ...state };
      // first check to see if item is already in cart, if so then add to its quantity
      if (action.id in updatedItems) {
        updatedItems[action.id] += action.quantity;
      } else {
        // if items isn't in cart, then add it
        updatedItems[action.id] = action.quantity;
      }
      return updatedItems;
    }
    case REMOVE_ITEM_FROM_CART: {
      const updatedItems = { ...state };
      // first check to see if item is already in cart, if so then subtract its quantity
      if (action.id in updatedItems) {
        if (updatedItems[action.id] <= action.quantity) {
          delete updatedItems[action.id]; // or remove completely;  prevents negative quantity
        } else {
          updatedItems[action.id] -= action.quantity;
        }
      }
      return updatedItems;
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
