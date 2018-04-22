import React from 'react';
import { connect } from 'react-redux';
import actions from '../../store/actions';
import fetchAndProcessServerData from '../../tools/fetchAndProcessServerData';

// invisible widget that automatically refreshes menu every 10 minutes
// place this all across the site e.g. cart widget, cart page, landing page,etc.
class RefreshServerDataWidget extends React.Component {
  constructor(props) {
    super(props);
    this._RefreshIfNecessasry();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.lastRefreshDate !== this.props.lastRefreshDate) {
      this._RefreshIfNecessasry();
    }
  }
  // refresh data after 10 minutes, but only if it's not already under way
  _RefreshIfNecessasry = () => !this.props.refreshInProgress &&
    this._menuDataStale(10) &&
    this._refreshStore()

  _menuDataStale = (maxMinutes) => {
    const lastRefreshDate = this.props.lastRefreshDate || 0;
    const minutesSinceLastRefresh =
      Math.floor(((Math.abs(Date.now() - lastRefreshDate)) / 1000) / 60);
    return (minutesSinceLastRefresh > maxMinutes);
  }

  _isNewStoreDataValid = newStoreData => (
    // greedy check, just make sure that there is data
    Object.keys(newStoreData.mainItemDetails).length &&
          Object.keys(newStoreData.categoryDetails).length
  )

  _refreshStore = () => {
    this.props.updateRefreshTracking(true);
    fetchAndProcessServerData
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
        this.props.updateRefreshTracking(false);
      });
  }

  // if any items are no longer available (after a refresh), remove them from the cart
  _removeAnyDiscontinuedItems = (newStoreData) => {
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

  render = () => {
    return null;
  }
}

// =================== CONNECT TO REDUX STORE ==================== //
const mapStateToProps = state => ({
  refreshInProgress: state.foodStore.refreshTracking.refreshInProgress,
  lastRefreshDate: state.foodStore.refreshTracking.lastRefreshDate,
  cart: state.user.cart,
});

const mapDispatchToProps = dispatch => ({
  updateRefreshTracking: isInProgress =>
    dispatch(actions.updateRefreshingTracking(isInProgress)),
  refreshMenu: newMenuData => dispatch(actions.refreshMenu(newMenuData)),
  removeDiscontinuedCartItem: (itemId, quantity) => {
    dispatch(actions.removeItemFromCart(itemId, quantity));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RefreshServerDataWidget);

