import { connect } from 'react-redux';
import actions from '../../store/actions';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const mapStateToProps = state => ({
  authToken: state.user.authToken,
  lastRefreshDate: state.foodStore.lastRefreshDate,
});

const mapDispatchToProps = dispatch => ({
  refreshMenu: (menuData, cartData) => {
    dispatch(actions.refreshMenu(menuData, cartData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
