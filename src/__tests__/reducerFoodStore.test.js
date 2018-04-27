import {
  categoryDetailsReducer,
  categoryToMainsHashReducer,
  mainItemDetailsReducer,
  dataFetchTrackingReducer,
} from '../store/reducers/reducerFoodStore';

import { PURGE_MENU, REFRESH_MENU, UPDATE_DATA_FETCH_TRACKING } from '../tools/constants';

const initialFoodStoreState = {
  dataFetchTracking: { lastDataFetchDate: 123123123, dataFetchInProgress: false },
  categoryDetails: [
    {
      id: 'catId:aaa',
      name: 'Sandwiches',
    },
    {
      id: 'catId:aaa',
      name: 'Sandwiches',
    },
  ],
  // a lookup data structure for category page to easily grab list of associated items
  categorytoMainsHash: {
    'itemId:aaa': ['catId:aaa', 'catId:bbb'],
  },
  mainItemDetails: {
    // id: {name, price, description}
    'itemId:aaa': {
      name: 'Chicken Fingers',
      price: 1299, // price is in cents, to reduce javascript rounding issues
      description: 'battered diabetes sauted with oral herpes',
    },
  },
};

describe('Redux Store: Food Menu Reducer', () => {
  describe('categoryDetailsReducer', () => {
    it("Purge Menu", () => {
      const state = initialFoodStoreState.categoryDetails;
      const action = {
        type: PURGE_MENU,
      };
      const results = categoryDetailsReducer(state, action);
      expect(results).toEqual([]);
    });

    it("Refresh Menu", () => {
      const state = [];
      const action = {
        type: REFRESH_MENU,
        categoryDetails: [
          {
            id: 'catId:aaa',
            name: 'Sandwiches',
          },
          {
            id: 'catId:aaa',
            name: 'Sandwiches',
          },
        ],
      };
      const results = categoryDetailsReducer(state, action);
      expect(results).toEqual(initialFoodStoreState.categoryDetails);
    });
  });

  describe('categoryToMainsHashReducer', () => {
    it("Purge Menu", () => {
      const state = initialFoodStoreState.categorytoMainsHash;
      const action = {
        type: PURGE_MENU,
      };
      const results = categoryToMainsHashReducer(state, action);
      expect(results).toEqual({});
    });

    it("Refresh Menu", () => {
      const state = {};
      const action = {
        type: REFRESH_MENU,
        categoryToMainsHash: {
          'itemId:aaa': ['catId:aaa', 'catId:bbb'],
        },
      };
      const results = categoryToMainsHashReducer(state, action);
      expect(results).toEqual(initialFoodStoreState.categorytoMainsHash);
    });
  });

  describe('mainItemDetailsReducer', () => {
    it("Purge Menu", () => {
      const state = initialFoodStoreState.mainItemDetails;
      const action = {
        type: PURGE_MENU,
      };
      const results = mainItemDetailsReducer(state, action);
      expect(results).toEqual({});
    });

    it("Refresh Menu", () => {
      const state = {};
      const action = {
        type: REFRESH_MENU,
        mainItemDetails: {
          'itemId:aaa': {
            name: 'Chicken Fingers',
            price: 1299, // price is in cents, to reduce javascript rounding issues
            description: 'battered diabetes sauted with oral herpes',
          },
        },
      };
      const results = mainItemDetailsReducer(state, action);
      expect(results).toEqual(initialFoodStoreState.mainItemDetails);
    });
  });

  describe('dataFetchTrackingReducer', () => {
    it("Purge Menu", () => {
      const state = initialFoodStoreState.dataFetchTracking;
      const action = {
        type: PURGE_MENU,
      };
      const results = dataFetchTrackingReducer(state, action);
      expect(results).toEqual({
        lastDataFetchDate: 0, dataFetchInProgress: false,
      });
    });

    it("Refresh Menu", () => {
      const state = initialFoodStoreState.dataFetchTracking;
      const action = {
        type: REFRESH_MENU,
      };
      const results = dataFetchTrackingReducer(state, action);
      expect(results.dataFetchInProgress).toEqual(false);
    });

    it("set progress flag on", () => {
      const state = initialFoodStoreState.dataFetchTracking;
      const action = {
        type: UPDATE_DATA_FETCH_TRACKING,
        isInProgress: true,
      };
      const results = dataFetchTrackingReducer(state, action);
      expect(results.dataFetchInProgress).toEqual(true);
    });
  });
});
