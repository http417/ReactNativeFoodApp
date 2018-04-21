import { connect } from 'react-redux';
import actions from '../../store/actions';
import ItemScreen from '../screens/ItemScreen';

const mapStateToProps = state => ({ mainItemDetails: state.foodStore.mainItemDetails });

const mapDispatchToProps = dispatch => ({
  onAddClick: (id) => {
    dispatch(actions.addItemToCart(id, 1));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemScreen);
