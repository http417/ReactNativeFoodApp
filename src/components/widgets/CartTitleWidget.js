import React from 'react';
import { connect } from 'react-redux';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, StyleSheet, Image, View } from 'react-native';
import CartWidget from './CartWidget';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingLeft: 10,
    backgroundColor: 'black',
    height: 80,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'red',
    shadowOffset: { height: 0, width: 0 },
  },
  headerImage: {
    marginLeft: 5,
    marginTop: 25,
    height: 30,
    width: 70,
  },
  titleContainer: {

  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 20,
    marginTop: 20,
  },
});

const CartTitleWidget = ({ updatedTotal }) => (
  <View style={styles.container}>
    <Image
      style={styles.headerImage}
      source={require('./logo2.png')} // eslint-disable-line
    />
    <Text style={styles.title}>
      Total Items In Cart: {updatedTotal}
    </Text>
  </View>
);


// =================== CONNECT TO REDUX STORE ==================== //

const recalculateCart = (cart, mainItemDetails) => {
  const [totalItems, ] =
      CartWidget.calculateCartQuantityCost(cart, mainItemDetails);
  return totalItems;
};

const mapStateToProps = state => ({
  updatedTotal: recalculateCart(state.user.cart, state.foodStore.mainItemDetails),
});

export default connect(mapStateToProps, null)(CartTitleWidget);

