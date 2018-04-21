import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TouchableHighlight } from 'react-native';
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
  footer: {
    paddingBottom: 15,
  },
  totalCostText: {
    borderTopWidth: 0.4,
    borderColor: 'darkslategrey',
    padding: 7,
    paddingLeft: 0,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainerText: {
    fontSize: 16,
    marginBottom: 20,
  },
  itemRemove: {
    borderWidth: 0.2,
    borderRadius: 3,
    padding: 8,
    borderColor: 'darkslategrey',
  },
});

class CartScreen extends React.Component {
  static navigationOptions = () => ({
    header: <CartTitleWidget />,
  });

  constructor(props) {
    super(props);
    this.state = {
      removingInProcess: false, // for disabling remove buttons after initially clicked
      checkoutInProgress: false,
      checkoutAttempts: 0,
    };
    [this.totalItems, this.totalCost] =
      CartWidget.calculateCartQuantityCost(this.props.cart, this.props.mainItemDetails);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.cartLastUpdated !== this.props.cartLastUpdated) {
      [this.totalItems, this.totalCost] =
        CartWidget.calculateCartQuantityCost(this.props.cart, this.props.mainItemDetails);
      setInterval(() => this.setState({ removingInProcess: false }), 1000);
      this.props.navigation.state.params.totalItems = this.totalItems;
      this.forceUpdate();
    }
  }

  removeItem = (id) => {
    this.setState({ removingInProcess: true });
    this.props.onRemoveClick(id);
  }

  displayLineItem = (itemId, itemInfo, itemQuantity) => {
    const subTotal = convertToDollars(itemInfo.price * itemQuantity);
    return (
      <View style={styles.flatList}>
        <Text style={styles.itemTitle}>{itemInfo.name}</Text>
        <View style={styles.lineItem}>
          <View style={styles.itemInfo}>
            <Text>Quantity: {itemQuantity}</Text>
            <Text>Price: ${convertToDollars(itemInfo.price)} x {itemQuantity} = ${subTotal}</Text>
          </View>
          <TouchableHighlight
            onPress={() => { if (!this.state.removingInProcess) this.removeItem(itemId); }}
            disabled={this.state.removingInProcess}
          >
            <Text style={styles.itemRemove}>
              { !this.state.removingInProcess ? `Remove Item` : `Processing...`}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  };

  _goToMenu = () => {
    this.props.navigation.navigate('CategoryListScreen');
  }

  _checkout = () => {
    this.setState(prevState =>
      ({ checkoutInProgress: true, checkoutAttempts: prevState.checkoutAttempts + 1 }));
    Alert.alert('Sorry, our store is currently closed.',
      this.state.checkoutAttempts ? `Boy, you don't give up easily, do you?` : `Try McDonalds`,
      [
        { text: 'Continue Shopping', onPress: this._goToMenu },
        !this.state.checkoutAttempts && { text: 'OK', onPress: () => { this.setState({ checkoutInProgress: false }); } },
      ],
    );
  }

  render() {
    const emptyCart = (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyContainerText}>Your cart is empty.  How about your stomach?</Text>
        <View>
          <Button title="Continue Shopping" onPress={this._goToMenu} />
        </View>
      </View>
    );
    const filledCart = (
      <View style={{ flex: 1 }}>
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
        <View style={styles.footer}>
          <Text style={styles.totalCostText}>
            Total Cost: ${convertToDollars(this.totalCost)}
          </Text>
          <View style={styles.signButton}>
            <Button disabled={this.state.checkoutInProgress} title="Check Out" onPress={this._checkout} />
          </View>
        </View>
      </View>
    );
    return !this.totalItems ? emptyCart : filledCart;
  }
}

export default CartScreen;
