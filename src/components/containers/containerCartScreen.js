import { connect } from 'react-redux';
import actions from '../../store/actions';
import CartScreen from '../screens/CartScreen';

const mapStateToProps = state => ({
  mainItemDetails: state.foodStore.mainItemDetails,
  cart: state.user.cart,
  cartLastUpdated: state.user.cartLastUpdated,
});
const mapDispatchToProps = dispatch => ({
  onRemoveClick: (id) => {
    dispatch(actions.removeItemFromCart(id, 1));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
