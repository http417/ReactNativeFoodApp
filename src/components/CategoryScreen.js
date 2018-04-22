import React from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, TouchableHighlight, StyleSheet } from 'react-native';
import { ITEM_SCREEN } from '../tools/constants';

const styles = StyleSheet.create({
  catButton: {
    backgroundColor: 'aliceblue',
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

class CategoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    if (!params) {
      return {
        title: 'Main Entrees',
      };
    }
    return {
      title: (params.name.length < 16) ? params.name : `${params.name.slice(0, 14)}...`,
    };
  }

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.mainItemDetails = this.props.mainItemDetails;
    this.categoryToEntreesHash = this.props.categoryToEntreesHash;
    this.id = params ? params.id : 0;
    // grab main items in this category
    this.itemsList = this.categoryToEntreesHash[this.id];
  }

  itemClicked = (itemID, itemName) => {
    this.props.navigation.navigate(ITEM_SCREEN, {
      id: itemID,
      name: itemName,
    });
  }

  render = () => (
    <View style={{ marginTop: 15 }}>
      <FlatList
        data={this.itemsList}
        renderItem={
          ({ item }) => (
            <TouchableHighlight
              style={styles.catButton}
              onPress={() => this.itemClicked(item, this.mainItemDetails[item].name)}
            >
              <Text style={styles.buttonText}>{this.mainItemDetails[item].name}</Text>
            </TouchableHighlight>
          )
        }
      />
    </View>
  );
}

// =================== CONNECT TO REDUX STORE ==================== //
const mapStateToProps = state => ({
  mainItemDetails: state.foodStore.mainItemDetails,
  categoryToEntreesHash: state.foodStore.categoryToEntreesHash,
});

export default connect(mapStateToProps, null)(CategoryScreen);
