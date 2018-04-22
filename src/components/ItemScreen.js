import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import actions from '../store/actions';
import convertToDollars from '../tools/priceConversion';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  buttonLine: {
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

class ItemScreen extends React.Component {
  static navigationOptions = () => ({ title: 'Entree' });

  constructor(props) {
    super(props);
    this.mainItemDetails = this.props.mainItemDetails;
    this.itemId = this.props.navigation.state.params.id || 0;
    this.state = { addingInProcess: false };
  }

  addItem = () => {
    this.setState({ addingInProcess: true });
    this.props.onAddClick(this.itemId);
    this.props.navigation.goBack();
  }

  render = () => (
    <View style={styles.container}>
      <Text style={styles.title}>{this.props.navigation.state.params.name}</Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={{ marginTop: 5, marginBottom: 10 }}>
        {this.mainItemDetails[this.itemId].description}
      </Text>
      <Text style={styles.label}>
        Price: {convertToDollars(this.mainItemDetails[this.itemId].price)}
      </Text>
      <View style={styles.buttonLine}>
        <Button disabled={this.state.addingInProcess} title="Add To Cart" onPress={this.addItem} />
      </View>
    </View>
  );
}

// =================== CONNECT TO REDUX STORE ==================== //
const mapStateToProps = state => ({ mainItemDetails: state.foodStore.mainItemDetails });

const mapDispatchToProps = dispatch => ({
  onAddClick: (id) => {
    dispatch(actions.addItemToCart(id, 1));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemScreen);
