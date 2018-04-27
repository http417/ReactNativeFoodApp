import { PURGE_CART, PURGE_MENU, REFRESH_MENU, UPDATE_DATA_FETCH_TRACKING, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_AUTH_TOKEN, STORE_AUTH_TOKEN, UPDATE_USER_PHONE } from '../tools/constants';
import fetchAndProcessServerData from '../tools/fetchAndProcessServerData';

const addItemToCart = (id, quantity = 1) => ({
  type: ADD_ITEM_TO_CART,
  id,
  quantity,
});

const removeItemFromCart = (id, quantity = 1) => ({
  type: REMOVE_ITEM_FROM_CART,
  id,
  quantity,
});

const purgeCart = () => ({
  type: PURGE_CART,
});

const purgeMenu = () => ({
  type: PURGE_MENU,
});

const refreshMenu = newMenuData => ({
  type: REFRESH_MENU,
  categoryDetails: newMenuData.categoryDetails,
  mainItemDetails: newMenuData.mainItemDetails,
  categoryToMainsHash: newMenuData.categoryToMainsHash,
});

const updateDataFetchTracking = isInProgress => ({
  type: UPDATE_DATA_FETCH_TRACKING,
  isInProgress,
});


const fetchNewMenuData = cart => async (dispatch) => {
  // greedy check, just make sure that there is data
  function _isNewStoreDataValid(newStoreData) {
      if (Object.keys(newStoreData.mainItemDetails).length && newStoreData.categoryDetails.length) {
        return true;
      } else {
        reject(Error("Server is not returning any data, so using previous redux store data."));
      }
  }
  // if any items are no longer available (after a refresh), remove them from the cart
  function _removeDiscontinuedItemsFromCart(newStoreData) {
    const idsToRemove = [];
    Object.keys(cart).forEach((itemId) => {
      if (!(itemId in newStoreData.mainItemDetails)) {
        idsToRemove.push(itemId);
      }
    });
    idsToRemove.forEach((itemId) => {
      dispatch(removeItemFromCart(itemId, cart[itemId]));
    });
    
  }
  dispatch(updateDataFetchTracking(true));
  try {
    const newStoreData = await fetchAndProcessServerData();
    await _isNewStoreDataValid(newStoreData);
    await Promise.all(
      [
        _removeDiscontinuedItemsFromCart(newStoreData),
        dispatch(refreshMenu(newStoreData))
      ]
    );
    dispatch(updateDataFetchTracking(false));
  }
  catch(error) {
    console.log('Unable to refresh store data: ', error);
    dispatch(updateDataFetchTracking(false));
  }
};

const updateUserPhone = number => ({
  type: UPDATE_USER_PHONE,
  number,
});

const clearAuthToken = () => ({
  type: CLEAR_AUTH_TOKEN,
});

const storeAuthToken = token => ({
  type: STORE_AUTH_TOKEN,
  token,
});

export default {
  fetchNewMenuData,
  addItemToCart,
  removeItemFromCart,
  updateUserPhone,
  storeAuthToken,
  clearAuthToken,
  purgeCart,
  purgeMenu,
};

