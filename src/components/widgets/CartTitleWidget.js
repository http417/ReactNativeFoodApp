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

class CartTitleWidget extends React.Component {
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
      // have to call this otherwise widget won't re-render since no props have changed
    }
  }

  _calculateTotalItems = () => {
    let totalItems = 0;
    Object.entries(this.props.cart).forEach(
      ([, quantity]) => {
        totalItems += quantity;
      },
    );
    return totalItems;
  }

  render = () => (
    <View style={styles.container}>
      <Image
        style={styles.headerImage}
        source={require('./logo2.png')} // eslint-disable-line
      />
      <Text style={styles.title}>
        Total Items In Cart: {this.totalItems}
      </Text>
    </View>
  );
}

// =================== CONNECT TO REDUX STORE ==================== //
const mapStateToProps = state => ({
  mainItemDetails: state.foodStore.mainItemDetails,
  cart: state.user.cart,
  cartLastUpdated: state.user.cartLastUpdated,
});

export default connect(mapStateToProps, null)(CartTitleWidget);
