import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import convertToDollars from '../../tools/priceConversion';
import RefreshMenuWidget from '../containers/containerRefreshMenuWidget';

const styles = StyleSheet.create({
  totalCountText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalCostText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

class CartScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Your Cart',
    };
  };

  removeItem = (id, cost) => {
    this.props.onRemoveClick(id, cost);
  }

  displayLineItem = (itemId, itemInfo, itemQuantity) => {
    const subTotal = parseFloat(convertToDollars(itemInfo.price)) * itemQuantity;
    return (
      <View style={styles.lineItem}>
        <View>
          <Text>{itemInfo.name}</Text>
          <Text>Quantity: {itemQuantity}</Text>
          <Text>Price: ${convertToDollars(itemInfo.price)} x {itemQuantity} = ${subTotal}</Text>
        </View>
        <View>
          <Button title="Remove Item" onPress={() => this.removeItem(itemId, itemInfo.price)} />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View>
        <RefreshMenuWidget />
        <Text style={styles.totalCountText}>
          Total Items In Your Cart: {this.props.cart.totalItems}
        </Text>
        <FlatList
          data={Object.entries(this.props.cart.items)}
          renderItem={
            ({ item }) => {
              const [itemId, itemQuantity] = item;
              const itemInfo = this.props.mainItemDetails[itemId];
              return (
                <View>
                  {this.displayLineItem(itemId, itemInfo, itemQuantity)}
                </View>
              );
            }
          }
        />
        <Text style={styles.totalCostText}>
          Total Cost: ${convertToDollars(this.props.cart.totalCost)}
        </Text>
      </View>
    );
  }
}

export default CartScreen;

