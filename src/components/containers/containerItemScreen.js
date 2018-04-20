import { connect } from 'react-redux';
import actions from '../../store/actions';
import ItemScreen from '../screens/ItemScreen';

const mapStateToProps = state => ({ mainItemDetails: state.foodStore.mainItemDetails });

const mapDispatchToProps = dispatch => ({
  onAddClick: (id, cost) => {
    dispatch(actions.addItemToCart(id, cost));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemScreen);
