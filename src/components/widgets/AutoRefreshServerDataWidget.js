import React from 'react';
import { connect } from 'react-redux';
import actions from '../../store/actions';

// invisible widget that automatically refreshes menu every 10 minutes
// place this all across the site e.g. cart widget, cart page, landing page,etc.
const createServerRefreshWidget = (WrappedComponent, minMinutesToRefresh=10) =>
  (class extends React.Component {
    constructor(props) {
      super(props); // need to pass these props down to the wrapped compoment
      this._fetchNewDataIfNecessasry();
    }

    componentDidUpdate = (prevProps) => {
      if (prevProps.lastDataFetchDate !== this.props.lastDataFetchDate) {
        this._fetchNewDataIfNecessasry();
      }
    }
    // refresh data after 10 minutes, but only if it's not already under way
    _fetchNewDataIfNecessasry = () => (
     !this.props.dataFetchInProgress &&
      this._menuDataStale(minMinutesToRefresh) &&
      this.props.fetchNewMenuData(this.props.cart)
    );

    _menuDataStale = (minMinutes) => {
      const lastDataFetchDate = this.props.lastDataFetchDate || 0;
      const minutesSinceLastDataFetch =
        Math.floor(((Math.abs(Date.now() - lastDataFetchDate)) / 1000) / 60);
      return (minutesSinceLastDataFetch > minMinutes);
    }

    render = () => <WrappedComponent {...this.props} />
  });

// =================== CONNECT TO REDUX STORE ==================== //
const mapStateToProps = state => ({
  dataFetchInProgress: state.foodStore.dataFetchTracking.dataFetchInProgress,
  lastDataFetchDate: state.foodStore.dataFetchTracking.lastDataFetchDate,
  cart: state.user.cart,
});

const mapDispatchToProps = dispatch => ({
  fetchNewMenuData: cart => dispatch(actions.fetchNewMenuData(cart)),
});

// note that the drawback of using this decorator appraoach is that
// the static properties of any decorated components will no longer be exposed automatically
// you will have to create a manual proxy property.
// see CartWidget.js as an example

const keepServerDataUpdated = (WrappedComponent, minMinutesToRefresh = 10) =>
  connect(mapStateToProps, mapDispatchToProps)(
    createServerRefreshWidget(WrappedComponent, minMinutesToRefresh));

export default keepServerDataUpdated;
