import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import convertToDollars from '../../tools/priceConversion';
import RefreshMenuWidget from '../containers/containerRefreshMenuWidget';
import CartWidget from '../widgets/CartWidget';

const styles = StyleSheet.create({
  itemTitle: {
    color: 'darkslategrey',
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalCostText: {
    borderTopWidth: 0.5,
    borderColor: 'darkslategrey',
    padding: 15,
    paddingLeft: 0,
    paddingTop: 25,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  checkoutButton: {
    width: 300,
  },
  flatList: {
    marginTop: 15,
    marginBottom: 10,
    paddingLeft: 10,
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

class CartScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    if (!params) {
      return {
        title: 'Your Cart',
      };
    }
    return {
      title: `Total Items In Cart: ${params.totalItems}`,
    };
  }
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
      <View style={styles.flatList}>
        <Text style={styles.itemTitle}>{itemInfo.name}</Text>
        <View style={styles.lineItem}>
          <View style={styles.itemInfo}>
            <Text>Quantity: {itemQuantity}</Text>
            <Text>Price: ${convertToDollars(itemInfo.price)} x {itemQuantity} = ${subTotal}</Text>
          </View>
          <View style={styles.itemRemove}>
            <Button title="Remove Item" onPress={() => this.removeItem(itemId)} />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View>
        <RefreshMenuWidget cartLastUpdated={this.props.cartLastUpdated} />
        <FlatList
          data={Object.entries(this.props.cart)}
          renderItem={
            ({ item }) => {
              const [itemId, quantity] = item;
              const itemInfo = this.props.mainItemDetails[itemId];
              return this.displayLineItem(itemId, itemInfo, quantity);
            }
          }
        />
        <Text style={styles.totalCostText}>
          Total Cost: ${convertToDollars(this.totalCost)}
        </Text>
        <View style={styles.signButton}>
          <Button title="Check Out" disabled />
        </View>
      </View>
    );
  }
}

export default CartScreen;
