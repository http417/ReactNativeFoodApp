import { connect } from 'react-redux';
import actions from '../../store/actions';
import CartScreen from '../screens/CartScreen';

const mapStateToProps = state => ({
  mainItemDetails: state.foodStore.mainItemDetails,
  cart: state.user.cart,
});
const mapDispatchToProps = dispatch => ({
  onRemoveClick: (id, cost) => {
    dispatch(actions.removeItemFromCart(id, cost));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
