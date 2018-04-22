import { PURGE_CART, PURGE_MENU, REFRESH_MENU, UPDATE_REFRESH_TRACKING, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_AUTH_TOKEN, STORE_AUTH_TOKEN, UPDATE_USER_PHONE } from '../constants/constants';

const refreshMenu = newMenuData => ({
  type: REFRESH_MENU,
  categoryDetails: newMenuData.categoryDetails,
  mainItemDetails: newMenuData.mainItemDetails,
  categoryToMainsHash: newMenuData.categoryToMainsHash,
});

const updateRefreshingTracking = isInProgress => ({
  type: UPDATE_REFRESH_TRACKING,
  isInProgress,
});

const purgeCart = () => ({
  type: PURGE_CART,
});

const purgeMenu = () => ({
  type: PURGE_MENU,
});

const updateUserPhone = number => ({
  type: UPDATE_USER_PHONE,
  number,
});

const addItemToCart = (id, quantity = 1) => ({
  type: ADD_ITEM_TO_CART,
  id,
  quantity,
});

const removeItemFromCart = (id, quantity = -1) => ({
  type: REMOVE_ITEM_FROM_CART,
  id,
  quantity,
});

const clearAuthToken = () => ({
  type: CLEAR_AUTH_TOKEN,
});

const storeAuthToken = token => ({
  type: STORE_AUTH_TOKEN,
  token,
});

export default {
  refreshMenu,
  updateRefreshingTracking,
  addItemToCart,
  removeItemFromCart,
  updateUserPhone,
  storeAuthToken,
  clearAuthToken,
  purgeCart,
  purgeMenu,
};

