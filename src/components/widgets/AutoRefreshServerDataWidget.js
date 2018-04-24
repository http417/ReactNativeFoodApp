import React from 'react';
import { connect } from 'react-redux';
import actions from '../../store/actions';

// invisible widget that automatically refreshes menu every 10 minutes
// place this all across the site e.g. cart widget, cart page, landing page,etc.
const createServerRefreshWidget = (WrappedComponent, minMinutesToRefresh) =>
  (class extends React.Component {
    constructor(props) {
      super(props); // need to pass these props down to the wrapped compoment
      this._RefreshIfNecessasry();
    }

    componentDidUpdate = (prevProps) => {
      if (prevProps.lastRefreshDate !== this.props.lastRefreshDate) {
        this._RefreshIfNecessasry();
      }
    }
    // refresh data after 10 minutes, but only if it's not already under way
    _RefreshIfNecessasry = () => {
      return !this.props.refreshInProgress &&
      this._menuDataStale(minMinutesToRefresh) &&
      this.props.refreshMenuData(this.props.cart);
    }

    _menuDataStale = (maxMinutes) => {
      const lastRefreshDate = this.props.lastRefreshDate || 0;
      const minutesSinceLastRefresh =
        Math.floor(((Math.abs(Date.now() - lastRefreshDate)) / 1000) / 60);
      return (minutesSinceLastRefresh > maxMinutes);
    }

    render = () => <WrappedComponent {...this.props} />
  });

// =================== CONNECT TO REDUX STORE ==================== //
const mapStateToProps = state => ({
  refreshInProgress: state.foodStore.refreshTracking.refreshInProgress,
  lastRefreshDate: state.foodStore.refreshTracking.lastRefreshDate,
  cart: state.user.cart,
});

const mapDispatchToProps = dispatch => ({
  refreshMenuData: cart => dispatch(actions.refreshMenuData(cart)),
});

const keepServerDataUpdated = (WrappedComponent, minMinutesToRefresh = 10) =>
  connect(mapStateToProps, mapDispatchToProps)(
    createServerRefreshWidget(WrappedComponent, minMinutesToRefresh));

export default keepServerDataUpdated;
