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
            Cart ({this.props.cartTotalItems}) ${priceConversion(this.props.cartTotalCost)}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const mapStateToProps = state => ({
  cartTotalItems: state.user.cart.totalItems,
  cartTotalCost: state.user.cart.totalCost,
});

export default connect(mapStateToProps, null)(CartWidget);
