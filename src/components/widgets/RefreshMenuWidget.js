import React from 'react';
import dataManager from '../../tools/dataFetch';

// invisible widget that automatically refreshes menu every 10 minutes
// place this all across the site e.g. cart widget, cart page, landing page,etc.
export default class extends React.Component {
  constructor(props) {
    super(props);
    if (this._menuDataStale()) { // check if the data is over 10 minutes old
      this._refreshStore(); // automatically fetch new data
    }
  }

  _menuDataStale() {
    const lastRefreshDate = this.props.lastRefreshDate || 0;
    const minutesSinceLastRefresh =
      Math.floor(((Math.abs(Date.now() - lastRefreshDate)) / 1000) / 60);
    // console.log('minutes since last refresh: ', minutesSinceLastRefresh);
    if (minutesSinceLastRefresh > 10) {
      return true;
    }
    return false;
  }


  _refreshStore() {
    // console.log('Updating the redux store');
    dataManager.processData
      .then((storeData) => {
        if (Object.keys(storeData.mainItems).length &&
          Object.keys(storeData.rawCategoryData).length) {
          this.props.refreshMenu(storeData);
        } else {
          throw new Error('Server returned missing data, so using old data');
        }
      })
      .catch((error) => {
        console.log('Unable to refresh store data: ', error);
      });
  }

  // if any items are no longer available (after a refresh), remove them from the cart
  _removeDiscontinuedItems(newStoreData) {
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
