import { connect } from 'react-redux';
import actions from '../../store/actions';
import CatListScreen from '../screens/CatListScreen';
import dataManager from '../../tools/dataFetch';

const mapStateToProps = (state) => {
  return ({
    lastRefreshDate: state.foodStore.lastRefreshDate,
    foodStore: state.foodStore,
  });
};

const mapDispatchToProps = dispatch => ({
  refreshMenu: () => {
    // fetch the data here
    dataManager.processData()
      .then((menuData) => {
        dispatch(actions.refreshMenu(menuData));
      })
      .catch((error) => {
        console.log("Problem fetching menu data: ", error);
      });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CatListScreen);
