import { connect } from 'react-redux';
import CatScreen from '../screens/CatScreen';

const mapStateToProps = state => ({
  mainItemDetails: state.foodStore.mainItemDetails,
  categoryContents: state.foodStore.categoryContents,
});

export default connect(mapStateToProps, null)(CatScreen);
