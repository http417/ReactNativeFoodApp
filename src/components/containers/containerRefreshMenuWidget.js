import { connect } from 'react-redux';
import actions from '../../store/actions';
import RefreshMenuWidget from '../widgets/RefreshMenuWidget';

const mapStateToProps = state => ({
  lastRefreshDate: state.foodStore.lastRefreshDate,
  cart: state.user.cart,
});

const mapDispatchToProps = dispatch => ({
  refreshMenu: (menuData, cartData) => {
    dispatch(actions.refreshMenu(menuData, cartData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RefreshMenuWidget);
