import { PURGE_CART, REFRESH_MENU, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, UPDATE_USER_PHONE, SIGN_OUT, SIGN_IN } from '../constants/constants';

const refreshMenu = (menuData, totalCartCost) => ({
  type: REFRESH_MENU,
  rawCategoryData: menuData.rawCategoryData,
  mainItemDetails: menuData.mainItemDetails,
  categoryContents: menuData.categoryContents,
  totalCartCost,
});

const purgeCart = () => ({
  type: PURGE_CART,
});

const updateUserPhone = number => ({
  type: UPDATE_USER_PHONE,
  number,
});

const addItemToCart = (id, cost) => ({
  type: ADD_ITEM_TO_CART,
  id,
  cost,
});

const removeItemFromCart = (id, cost) => ({
  type: REMOVE_ITEM_FROM_CART,
  id,
  cost,
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

