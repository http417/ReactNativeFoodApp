import React from 'react';
import { View, Text, FlatList, TouchableHighlight, StyleSheet, BackHandler } from 'react-native';

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

class CatScreen extends React.Component {
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
    this.categoryContents = this.props.categoryContents;
    this.id = params ? params.id : 0;
    // grab main items in this category
    this.itemsList = this.categoryContents[this.id];
  }

  itemClicked = (itemID, itemName) => {
    this.props.navigation.navigate('ItemScreen', {
      id: itemID,
      name: itemName,
    });
  };

  render() {
    return (
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
}

export default CatScreen;

