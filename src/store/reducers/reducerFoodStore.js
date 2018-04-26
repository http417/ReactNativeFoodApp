import { combineReducers } from 'redux';
import { REFRESH_MENU, UPDATE_DATA_FETCH_TRACKING, PURGE_MENU } from '../../tools/constants';


//  [0: {name: 'Meats', id: 'sdsadg', ... }, 1: {name: donuts, id: '23532sdadf', ...}]
const initialCategoryDetails = [];
export const categoryDetailsReducer = (state = initialCategoryDetails, action) => {
  switch (action.type) {
    case REFRESH_MENU:
      return action.categoryDetails;
    case PURGE_MENU:
      return initialCategoryDetails;
    default:
      return state;
  }
};


// { 23523525: [6312361236,2136236,236123612], }
const initialHash = {};
export const categoryToMainsHashReducer = (state = initialHash, action) => {
  switch (action.type) {
    case REFRESH_MENU:
      return action.categoryToMainsHash;
    case PURGE_MENU:
      return initialHash;
    default:
      return state;
  }
};

  // { 23523525:
  // {name: 'Chicken Fingers', price: 1299, description: 'battered diabetes sauted with diahrea' },
  // }
const initialMainItemDetails = {};
export const mainItemDetailsReducer = (state = initialMainItemDetails, action) => {
  switch (action.type) {
    case REFRESH_MENU:
      return action.mainItemDetails;
    case PURGE_MENU:
      return initialMainItemDetails;
    default:
      return state;
  }
};

const initialDataFetchTrackingState = {
  lastDataFetchDate: 0, dataFetchInProgress: false,
};
export const dataFetchTrackingReducer = (state = initialDataFetchTrackingState, action) => {
  switch (action.type) {
    case REFRESH_MENU:
      return { lastDataFetchDate: Date.now(), dataFetchInProgress: state.dataFetchInProgress }
    case PURGE_MENU:
      return initialDataFetchTrackingState;
    case UPDATE_DATA_FETCH_TRACKING:
      return { ...state, dataFetchInProgress: action.isInProgress };
    default:
      return state;
  }
};

export default combineReducers({
  categoryToMainsHash: categoryToMainsHashReducer,
  mainItemDetails: mainItemDetailsReducer,
  categoryDetails: categoryDetailsReducer,
  dataFetchTracking: dataFetchTrackingReducer,
});
