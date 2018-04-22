import { combineReducers } from 'redux';
import { REFRESH_MENU, UPDATE_REFRESH_TRACKING, PURGE_MENU } from '../../tools/constants';


// { 0: {name: 'Meats', id: 'sdsadg' }, }
const rawCategoryDataReducer = (state = {}, action) => {
  switch (action.type) {
    case REFRESH_MENU:
      return action.rawCategoryData;
    case PURGE_MENU:
      return {};
    default:
      return state;
  }
};


// { 23523525: [6312361236,2136236,236123612], }
const categoryContentsReducer = (state = {}, action) => {
  switch (action.type) {
    case REFRESH_MENU:
      return action.categoryContents;
    case PURGE_MENU:
      return {};
    default:
      return state;
  }
};


  // { 23523525:
  // {name: 'Chicken Fingers', price: 1299, description: 'battered diabetes sauted with diahrea' },
  // }

const mainItemDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case REFRESH_MENU:
      return action.mainItemDetails;
    case PURGE_MENU:
      return {};
    default:
      return state;
  }
};

const initialRefreshTrackingState = {
  lastRefreshDate: 0, refreshInProgress: false,
};

const refreshTrackingReducer = (state = initialRefreshTrackingState, action) => {
  switch (action.type) {
    case REFRESH_MENU:
      return { lastRefreshDate: Date.now(), refreshInProgress: false };
    case PURGE_MENU:
      return initialRefreshTrackingState;
    case UPDATE_REFRESH_TRACKING:
      return { ...state, refreshInProgress: action.isInProgress };
    default:
      return state;
  }
};

export default combineReducers({
  categoryContents: categoryContentsReducer,
  mainItemDetails: mainItemDetailsReducer,
  rawCategoryData: rawCategoryDataReducer,
  refreshTracking: refreshTrackingReducer,
});
