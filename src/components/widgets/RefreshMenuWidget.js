import React from 'react';
import dataManager from '../../tools/dataFetch';

// invisible widget that automatically refreshes menu every 10 minutes
// place this all across the site
export default class extends React.Component {
  constructor(props) {
    super(props);
    if (this._menuDataStale()) {
      this._refreshStore();
    }
  }

  _menuDataStale() {
    const lastRefreshDate = this.props.lastRefreshDate || 0;
    const minutesSinceLastRefresh =
      Math.floor(((Math.abs(Date.now() - lastRefreshDate)) / 1000) / 60);
    console.log('minutes since last refresh: ', minutesSinceLastRefresh);
    if (minutesSinceLastRefresh > 0) {
      return true;
    }
    return false;
  }

  _refreshStore() {
    console.log('Updating the redux store');
    dataManager.processData
      .then((storeData) => {
        this.props.refreshMenu(storeData, this._calcCartCost(storeData));
        console.log('Store Date was refreshed on ', new Date());
      })
      .catch((error) => {
        console.log('Unable to refresh store data: ', error);
      });
  }

  _calcCartCost(newStoreData) {
    const { items } = this.props.cart;
    const { mainItemDetails } = newStoreData;
    let totalCost = 0;
    Object.entries(items).forEach(
      ([itemId, itemQuantity]) => {
        const itemPrice = mainItemDetails[itemId].price;
        totalCost += (itemPrice * itemQuantity);
      },
    );
    return totalCost;
  }

  render() {
    return null;
  }
}
