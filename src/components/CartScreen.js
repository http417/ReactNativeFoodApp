import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import actions from '../store/actions';
import convertToDollars from '../tools/priceConversion';
import RefreshMenuWidget from './widgets/RefreshMenuWidget';
import CartWidget from './widgets/CartWidget';
import CartTitleWidget from './widgets/CartTitleWidget';
import CartListItemWidget from './widgets/CartListItemWidget';

const styles = StyleSheet.create({
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
  emptyContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainerText: {
    fontSize: 16,
    marginBottom: 20,
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
    }
  }

  _removeItem = (id) => {
    this.setState({ removingInProcess: true });
    this.props.onRemoveClick(id);
  }

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

  render = () => {
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
              // try to condense this as a function spread operator later
              const [itemId, quantity] = item;
              const itemInfo = this.props.mainItemDetails[itemId];
              return (<CartListItemWidget
                itemId={itemId}
                itemInfo={itemInfo}
                itemQuantity={quantity}
                onRemoveClick={this._removeItem}
                stateRemovingInProcess={this.state.removingInProcess}
              />);
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

// =================== CONNECT TO REDUX STORE ==================== //
const mapStateToProps = state => ({
  mainItemDetails: state.foodStore.mainItemDetails,
  cart: state.user.cart,
  cartLastUpdated: state.user.cartLastUpdated,
});
const mapDispatchToProps = dispatch => ({
  onRemoveClick: (id) => {
    dispatch(actions.removeItemFromCart(id, 1));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);

