import React from 'react';
import { connect } from 'react-redux';
import actions from '../../store/actions';
import dataManager from '../../tools/dataFetch';

// invisible widget that automatically refreshes menu every 10 minutes
// place this all across the site e.g. cart widget, cart page, landing page,etc.
class RefreshServerDataWidget extends React.Component {
  constructor(props) {
    super(props);
    if (this._menuDataStale(10)) { // check if the data is over 10 minutes old
      this._refreshStore(); // automatically fetch new data
    }
  }
  _menuDataStale(maxMinutes) {
    const lastRefreshDate = this.props.lastRefreshDate || 0;
    const minutesSinceLastRefresh =
      Math.floor(((Math.abs(Date.now() - lastRefreshDate)) / 1000) / 60);
    return (minutesSinceLastRefresh > maxMinutes);
  }

  _isNewStoreDataValid = newStoreData => (
    // greedy check, just make sure that there is data
    Object.keys(newStoreData.mainItems).length &&
          Object.keys(newStoreData.rawCategoryData).length
  )

  _refreshStore() {
    // console.log('Updating the redux store');
    dataManager.processData
      .then((newStoreData) => {
        if (this._isNewStoreDataValid) {
          this._removeAnyDiscontinuedItems(newStoreData);
          this.props.refreshMenu(newStoreData);
        } else { // don't update the redux store; use old data
          throw new Error('Server returned missing data, so using old data');
        }
      })
      .catch((error) => {
        console.log('Unable to refresh store data: ', error);
      });
  }

  // if any items are no longer available (after a refresh), remove them from the cart
  _removeAnyDiscontinuedItems(newStoreData) {
    const { cart } = this.props; // { {itemID: quantity}, }
    const idsToRemove = []; // store id's of items that should be deleted after processing the data
    Object.keys(cart).forEach((itemId) => {
      if (!(itemId in newStoreData.mainItemDetails)) {
        idsToRemove.push(itemId);
      }
    });
    idsToRemove.forEach((itemId) => {
      this.props.removeDiscontinuedCartItem(itemId, cart[itemId].quantity);
    });
  }

  render() {
    return null;
  }
}

// =================== CONNECT TO REDUX STORE ==================== //
const mapStateToProps = state => ({
  lastRefreshDate: state.foodStore.lastRefreshDate,
  cart: state.user.cart,
});

const mapDispatchToProps = dispatch => ({
  refreshMenu: (menuData, cartData) => {
    dispatch(actions.refreshMenu(menuData, cartData));
  },
  removeDiscontinuedCartItem: (itemId, quantity) => {
    dispatch(actions.removeItemFromCart(itemId, quantity));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RefreshServerDataWidget);

