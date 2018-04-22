import React from 'react';
import { View, Text, FlatList, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import actions from '../store/actions';
import dataManager from '../tools/dataFetch';
import LogoHeader from './widgets/LogoHeader';
import { CATEGORY_SCREEN } from '../tools/constants';

const styles = StyleSheet.create({
  catButton: {
    backgroundColor: 'lightsteelblue',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    borderWidth: 0.5,
    borderColor: '#000000',
    paddingLeft: 20,
  },
  buttonText: {
    fontSize: 16,
  },
});

class CategoryListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Good Uncle Menu',
    header: <LogoHeader signedIn navigation={navigation} />,
  });

  _itemClicked = (catID, catName) => {
    this.props.navigation.navigate(CATEGORY_SCREEN, {
      id: catID,
      name: catName,
    });
  }

  render = () => (
    <View>
      <FlatList
        data={Object.values(this.props.rawCategoryData)}
        renderItem={
          ({ item }) => (
            <TouchableHighlight
              style={styles.catButton}
              onPress={() => this._itemClicked(item.id, item.name)}
            >
              <Text style={styles.buttonText}>{item.name}</Text>
            </TouchableHighlight>
          )
        }
      />
    </View>
  );
}

// =================== CONNECT TO REDUX STORE ==================== //

const mapStateToProps = state => ({
  rawCategoryData: state.foodStore.rawCategoryData,
});

const mapDispatchToProps = dispatch => ({
  refreshMenu: () => dataManager.processData() // fetch the data here
    .then(menuData => dispatch(actions.refreshMenu(menuData)))
    .catch(error => console.log("Problem fetching menu data: ", error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListScreen);

