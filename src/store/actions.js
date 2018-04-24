import { PURGE_CART, PURGE_MENU, REFRESH_MENU, UPDATE_REFRESH_TRACKING, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_AUTH_TOKEN, STORE_AUTH_TOKEN, UPDATE_USER_PHONE } from '../tools/constants';
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

const updateRefreshTracking = isInProgress => ({
  type: UPDATE_REFRESH_TRACKING,
  isInProgress,
});


const refreshMenuData = cart => (dispatch) => {
  const _isNewStoreDataValid = newStoreData => (
    // greedy check, just make sure that there is data
    Object.keys(newStoreData.mainItemDetails).length &&
          newStoreData.categoryDetails.length
  );
  // if any items are no longer available (after a refresh), remove them from the cart
  const _removeDiscontinuedItemsFromCart = (newStoreData) => {
    const idsToRemove = [];
    Object.keys(cart).forEach((itemId) => {
      if (!(itemId in newStoreData.mainItemDetails)) {
        idsToRemove.push(itemId);
      }
    });
    idsToRemove.forEach((itemId) => {
      dispatch(removeItemFromCart(itemId, cart[itemId].quantity));
    });
  };

  dispatch(updateRefreshTracking(true));
  fetchAndProcessServerData
    .then((newStoreData) => {
      if (_isNewStoreDataValid(newStoreData)) {
        _removeDiscontinuedItemsFromCart(newStoreData);
        dispatch(refreshMenu(newStoreData));
        dispatch(updateRefreshTracking(false));
      } else { // don't update the redux store; use old data
        throw new Error('Server returned missing data, so using old data');
      }
    })
    .catch((error) => {
      console.log('Unable to refresh store data: ', error);
      this.props.updateRefreshTracking(false);
    });
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
  refreshMenuData,
  addItemToCart,
  removeItemFromCart,
  updateUserPhone,
  storeAuthToken,
  clearAuthToken,
  purgeCart,
  purgeMenu,
};

