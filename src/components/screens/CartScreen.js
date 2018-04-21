import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import convertToDollars from '../../tools/priceConversion';
import RefreshMenuWidget from '../containers/containerRefreshMenuWidget';
import CartWidget from '../widgets/CartWidget';
import CartTitleWidget from '../widgets/CartTitleWidget';

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
  emptyContainer: {
    flex: .5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainerText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

class CartScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: <CartTitleWidget />,
  });

  constructor(props) {
    super(props);
    [this.totalItems, this.totalCost] =
      CartWidget.calculateCartQuantityCost(this.props.cart, this.props.mainItemDetails);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.cartLastUpdated !== this.props.cartLastUpdated) {
      [this.totalItems, this.totalCost] =
        CartWidget.calculateCartQuantityCost(this.props.cart, this.props.mainItemDetails);
      this.props.navigation.state.params.totalItems = this.totalItems;
      this.forceUpdate();
      console.log('new navigation state: ', this.props.navigation.state);
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

  _goToMenu = () => {
    this.props.navigation.navigate('CategoryListScreen');
  }

  render() {
    const emptyCart = (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyContainerText}>Your cart is empty.  How about your stomach?</Text>
        <View style={styles.itemRemove}>
          <Button title="Continue Shopping" onPress={this._goToMenu} />
        </View>
      </View>
    );
    const filledCart = (
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
          <Button title="Check Out" disabled onPress={() => console.log('disabled Checkout')} />
        </View>
      </View>
    );
    return !this.totalItems ? emptyCart : filledCart;
  }
}

export default CartScreen;
