import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import actions from '../store/actions';
import convertToDollars from '../tools/priceConversion';
import keepServerDataUpdated from './widgets/AutoRefreshServerDataWidget';
import CartWidget from './widgets/CartWidget';
import CartListItemWidget from './widgets/CartListItemWidget';
import EmptyCartWidget from './widgets/EmptyCartWidget';
import { CATEGORY_LIST_SCREEN } from '../tools/constants';

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
});

class CartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      removingInProcess: false, // for disabling remove buttons after initially clicked
      checkoutInProgress: false,
      checkoutAttempts: 0,
    };
  }

  _removeItem = (id) => {
    this.setState({ removingInProcess: true });
    this.props.onRemoveClick(id);
    setInterval(() => this.setState({ removingInProcess: false }), 500);
  }

  _goToMenu = () => {
    this.props.navigation.navigate(CATEGORY_LIST_SCREEN);
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
    const { updatedTotals } = this.props;
    const { totalCost, totalItems } = updatedTotals;
    const emptyCart = <EmptyCartWidget goToMenu={this._goToMenu} />;
    const filledCart = (
      <View style={{ flex: 1 }}>
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
            Total Cost: ${convertToDollars(totalCost)}
          </Text>
          <View style={styles.signButton}>
            <Button disabled={this.state.checkoutInProgress} title="Check Out" onPress={this._checkout} />
          </View>
        </View>
      </View>
    );
    return !totalItems ? emptyCart : filledCart;
  }
}

CartScreen.propTypes = {
  mainItemDetails: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  updatedTotals: PropTypes.shape({
    totalItems: PropTypes.number,
    totalCost: PropTypes.number,
  }).isRequired,
};

// =================== CONNECT TO REDUX STORE ==================== //

const recalculateCart = (cart, mainItemDetails) => {
  const [totalItems, totalCost] =
      CartWidget.calculateCartQuantityCost(cart, mainItemDetails);
  return { totalItems, totalCost };
};


const mapStateToProps = state => ({
  mainItemDetails: state.foodStore.mainItemDetails,
  cart: state.user.cart,
  updatedTotals: recalculateCart(state.user.cart, state.foodStore.mainItemDetails),
});
const mapDispatchToProps = dispatch => ({
  onRemoveClick: (id) => {
    dispatch(actions.removeItemFromCart(id, 1));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(keepServerDataUpdated(CartScreen));

