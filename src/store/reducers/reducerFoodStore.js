import { combineReducers } from 'redux';
import { REFRESH_MENU } from '../../constants/constants';

const catsInitialState = {
  // 0: {name: 'Meats', id: 'sdsadg' },
};

const rawCategoryDataReducer = (state = catsInitialState, action) => {
  switch (action.type) {
    case REFRESH_MENU:
      return action.rawCategoryData;
    default:
      return state;
  }
};

const catContentsInitialState = {
  // 23523525: [6312361236,2136236,236123612],
};

const categoryContentsReducer = (state = catContentsInitialState, action) => {
  switch (action.type) {
    case REFRESH_MENU:
      return action.categoryContents;
    default:
      return state;
  }
};

const mainsInitialState = {
  // 23523525:
  // {name: 'Chicken Fingers', price: 1299, description: 'battered diabetes sauted with diahrea' },
};

const mainItemDetailsReducer = (state = mainsInitialState, action) => {
  switch (action.type) {
    case REFRESH_MENU:
      return action.mainItemDetails;
    default:
      return state;
  }
};

const lastRefreshDateReducer = (state = 0, action) => {
  switch (action.type) {
    case REFRESH_MENU:
      return Date.now();
    default:
      return state;
  }
};

export default combineReducers({
  categoryContents: categoryContentsReducer,
  mainItemDetails: mainItemDetailsReducer,
  rawCategoryData: rawCategoryDataReducer,
  lastRefreshDate: lastRefreshDateReducer,
});
