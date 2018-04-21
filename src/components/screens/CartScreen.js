import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import convertToDollars from '../../tools/priceConversion';
import RefreshMenuWidget from '../containers/containerRefreshMenuWidget';
import CartWidget from '../widgets/CartWidget';

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
  constructor(props) {
    super(props);
    [this.totalItems, this.totalCost] =
      CartWidget.calculateCartQuantityCost(this.props.cart, this.props.mainItemDetails);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.cartLastUpdated !== this.props.cartLastUpdated) {
      [this.totalItems, this.totalCost] =
        CartWidget.calculateCartQuantityCost(this.props.cart, this.props.mainItemDetails);
      this.forceUpdate();
    }
  }

  removeItem = (id) => {
    this.props.onRemoveClick(id);
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
          <Button title="Remove Item" onPress={() => this.removeItem(itemId)} />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View>
        <RefreshMenuWidget cartLastUpdated={this.props.cartLastUpdated} />
        <Text style={styles.totalCountText}>
          Total Items In Your Cart: {this.totalItems}
        </Text>
        <FlatList
          data={Object.entries(this.props.cart)}
          renderItem={
            ({ item }) => {
              const [itemId, quantity] = item;
              const itemInfo = this.props.mainItemDetails[itemId];
              return (
                <View>
                  {this.displayLineItem(itemId, itemInfo, quantity)}
                </View>
              );
            }
          }
        />
        <Text style={styles.totalCostText}>
          Total Cost: ${convertToDollars(this.totalCost)}
        </Text>
      </View>
    );
  }
}

export default CartScreen;
