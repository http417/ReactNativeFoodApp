import { PURGE_CART, REFRESH_MENU, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, SIGN_OUT, SIGN_IN, UPDATE_USER_PHONE } from '../constants/constants';

const refreshMenu = menuData => ({
  type: REFRESH_MENU,
  rawCategoryData: menuData.rawCategoryData,
  mainItemDetails: menuData.mainItemDetails,
  categoryContents: menuData.categoryContents,
});

const purgeCart = () => ({
  type: PURGE_CART,
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

const signOut = () => ({
  type: SIGN_OUT,
});

const signIn = token => ({
  type: SIGN_IN,
  token,
});

export default {
  refreshMenu,
  addItemToCart,
  removeItemFromCart,
  updateUserPhone,
  signOut,
  signIn,
  purgeCart,
};

