import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import convertToDollars from '../../tools/priceConversion';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  buttonLine: {
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

class ItemScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Entree',
  });

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.mainItemDetails = this.props.mainItemDetails;
    this.itemId = params ? params.id : 0;
  }

  addItem = () => {
    this.props.onAddClick(this.itemId);
    this.props.navigation.goBack();
  }

  render = () => (
    <View style={styles.container}>
      <Text style={styles.title}>{this.props.navigation.state.params.name}</Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={{ marginTop: 5, marginBottom: 10 }}>
        {this.mainItemDetails[this.itemId].description}
      </Text>
      <Text style={styles.label}>
        Price: {convertToDollars(this.mainItemDetails[this.itemId].price)}
      </Text>
      <View style={styles.buttonLine}>
        <Button title="Add To Cart" onPress={this.addItem} />
      </View>
    </View>
  );
}

export default ItemScreen;

