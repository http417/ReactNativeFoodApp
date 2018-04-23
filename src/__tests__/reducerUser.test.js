import { authTokenReducer, cartReducer } from '../store/reducers/reducerUser';

import { PURGE_CART, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_AUTH_TOKEN, STORE_AUTH_TOKEN } from '../tools/constants';

const initialCartState = {
  authToken: '2172935234',
  phone: 2172935234,
  cart: {
    'aaa': 3,
  },
};


describe('Redux Store User: Data Reducer:', () => {
  describe('Cart Reducer', () => {
    it("Purge Cart", () => {
      const state = initialCartState.cart;
      const action = {
        type: PURGE_CART,
      };
      const results = cartReducer(state, action)
      expect(results).toEqual({});
    });

    it("Add Item To Cart", () => {
      const state = initialCartState.cart;
      const action = {
        type: ADD_ITEM_TO_CART,
        quantity: 1,
        id: 'abc',
      };
      const results = cartReducer(state, action);
      expect(results).toEqual({
        'aaa': 3,
        'abc': 1,
      });
    });

    it("Remove Item From Cart", () => {
      const state = initialCartState.cart;
      const action = {
        type: REMOVE_ITEM_FROM_CART,
        quantity: 2,
        id: 'aaa',
      };
      const results = cartReducer(state, action);
      expect(results).toEqual({
        'aaa': 1,
      });
    });

    it("Remove Excessive Quantity of Item From Cart", () => {
      const state = initialCartState.cart;
      const action = {
        type: REMOVE_ITEM_FROM_CART,
        quantity: 12,
        id: 'aaa',
      };
      const results = cartReducer(state, action);
      expect(results).toEqual({
      });
    });
  });

  describe('Authentication Token', () => {
    it("Clear Out Token", () => {
      const state = initialCartState.authToken;
      const action = {
        type: CLEAR_AUTH_TOKEN,
      };
      const results = authTokenReducer(state, action);
      expect(results).toEqual('');
    });

    it("Store New Token", () => {
      const state = '';
      const action = {
        type: STORE_AUTH_TOKEN,
        token: '9132352352',
      };
      const results = authTokenReducer(state, action);
      expect(results).toEqual('9132352352');
    });

    it("Override Existing Token", () => {
      const state = initialCartState.authToken;
      const action = {
        type: STORE_AUTH_TOKEN,
        token: '9132352352',
      };
      const results = authTokenReducer(state, action);
      expect(results).toEqual('9132352352');
    });
  });
});
