import React from 'react';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, StyleSheet, TouchableHighlight, View } from 'react-native';
import priceConversion from '../../tools/priceConversion';
import RefreshMenuWidget from '../containers/containerRefreshMenuWidget';

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
      // have to call this otherwise cart won't re-render since no props have changed
    }
  }

  _goToCart = () => {
    this.props.navigation.navigate('CartScreen');
  };

  render = () => {
    const { darkTheme } = this.props;
    return (
      <TouchableHighlight
        style={(darkTheme) ? styles.darkButton : styles.button}
        onPress={this._goToCart}
      >
        <View style={styles.container}>
          <RefreshMenuWidget />
          <Ionicons name="ios-cart" size={18} />
          <Text style={(darkTheme) ? styles.darkText : styles.text}>
            {this.totalCost ?
              `Cart (${this.totalItems}) $${priceConversion(this.totalCost)}` :
              `Cart (${this.totalItems}) `}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.user.cart,
  mainItemDetails: state.foodStore.mainItemDetails,
  cartLastUpdated: state.user.cartLastUpdated,
});

export default connect(mapStateToProps, null)(CartWidget);
