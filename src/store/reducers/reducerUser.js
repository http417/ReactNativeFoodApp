
import { combineReducers } from 'redux';
import { REFRESH_MENU, PURGE_CART, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, UPDATE_USER_PHONE, SIGN_OUT, SIGN_IN } from '../../constants/constants';


const initialCartState = {
  items: {
    // id: quantity
  },
  totalCost: 0,
  totalItems: 0,
};
const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case PURGE_CART: {
      return initialCartState;
    }
    case ADD_ITEM_TO_CART: {
      const newCart = { ...state };
      newCart.items = state.items; // since spread operator doesn't do deep copy
      // first check to see if item is already in cart, if so then add to its quantity
      if (action.id in newCart.items) {
        newCart.items[action.id] += 1;
      } else {
        // if items isn't in cart, then add it
        newCart.items[action.id] = 1;
      }
      newCart.totalCost += action.cost;
      newCart.totalItems += 1;
      return newCart;
    }
    case REMOVE_ITEM_FROM_CART: {
      const newCart = { ...state };
      newCart.items = state.items;
      // first check to see if item is already in cart, if so then add to its quantity
      if (action.id in newCart.items) {
        const newQuantity = newCart.items[action.id] - 1;
        if (newQuantity < 1) {
          delete newCart.items[action.id];
        } else {
          newCart.items[action.id] = newQuantity;
        }
      }
      newCart.totalItems -= 1;
      newCart.totalCost -= action.cost;
      return newCart;
    }
    case REFRESH_MENU: { // ensure the cart's prices are up to date
      const newCart = { ...state };
      newCart.items = state.items;
      newCart.totalCost = action.totalCartCost;
      return newCart;
    }
    default:
      return state;
  }
};

const phoneReducer = (state = '', action) => {
  switch (action.type) {
    case UPDATE_USER_PHONE:
      return action.number;
    default:
      return state;
  }
};

const authTokenReducer = (state = '', action) => {
  console.log('signing out in reducer');
  switch (action.type) {
    case SIGN_IN:
      return action.token;
    case SIGN_OUT:
      return '';
    default:
      return state;
  }
};

export default combineReducers({
  authToken: authTokenReducer,
  phone: phoneReducer,
  cart: cartReducer,
});


/*
export default (state = {}, action) => ({
  phone: phone(state.phone, action),
  cart: cart(state.cart, action),
});
*/
