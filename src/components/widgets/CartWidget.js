import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, StyleSheet, TouchableHighlight, View } from 'react-native';
import priceConversion from '../../tools/priceConversion';
import AutoRefreshServerDataWidget from './AutoRefreshServerDataWidget';
import { CART_SCREEN } from '../../tools/constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  lightButton: {
    borderColor: 'white',
    color: 'white',
  },
  text: {
    marginLeft: 5,
  },
  darkText: {
    marginLeft: 5,
    color: 'black',
    backgroundColor: 'white',
  },
  button: {
    marginRight: 15,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: 'darkslateblue',
    padding: 10,
  },
  darkButton: {
    marginRight: 15,
    marginTop: 20,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: 'lightgray',
    padding: 10,
    backgroundColor: 'white',
  },
});

class CartWidget extends React.Component {
  // statically declare this function so that the cart screen can use it's logic
  static calculateCartQuantityCost = (cart, mainItemDetails) => {
    let totalItems = 0;
    let totalCost = 0;
    Object.entries(cart).forEach(
      ([itemId, quantity]) => {
        totalItems += quantity;
        totalCost += (mainItemDetails[itemId].price * quantity);
      },
    );
    return [totalItems, totalCost];
  }

  _goToCart = () => {
    this.props.navigation.navigate(CART_SCREEN);
  };

  render = () => {
    const { darkTheme, updatedTotals } = this.props;
    const { totalItems, totalCost } = updatedTotals;
    return (
      <TouchableHighlight
        style={(darkTheme) ? styles.darkButton : styles.button}
        onPress={this._goToCart}
      >
        <View style={styles.container}>
          <AutoRefreshServerDataWidget />
          <Ionicons name="ios-cart" size={18} />
          <Text style={(darkTheme) ? styles.darkText : styles.text}>
            {this.props.updatedTotals.totalCost ?
              `Cart (${totalItems}) $${priceConversion(totalCost)}` :
              `Cart (${totalItems}) `}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

CartWidget.propTypes = {
  mainItemDetails: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, null)(CartWidget);
