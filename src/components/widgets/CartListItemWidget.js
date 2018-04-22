import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import convertToDollars from '../../tools/priceConversion';

const styles = StyleSheet.create({
  flatList: {
    marginTop: 15,
    marginBottom: 10,
    paddingLeft: 10,
  },
  itemTitle: {
    color: 'darkslategrey',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  itemRemove: {
    borderWidth: 0.2,
    borderRadius: 3,
    padding: 8,
    borderColor: 'darkslategrey',
  },
});

export default (props) => {
  const {
    itemId,
    itemInfo,
    itemQuantity,
    stateRemovingInProcess,
    onRemoveClick,
  } = props;
  const subTotal = convertToDollars(itemInfo.price * itemQuantity);
  return (
    <View style={styles.flatList}>
      <Text style={styles.itemTitle}>{itemInfo.name}</Text>
      <View style={styles.lineItem}>
        <View>
          <Text>Quantity: {itemQuantity}</Text>
          <Text>Price: ${convertToDollars(itemInfo.price)} x {itemQuantity} = ${subTotal}</Text>
        </View>
        <TouchableHighlight
          onPress={() => { if (!stateRemovingInProcess) onRemoveClick(itemId); }}
          disabled={stateRemovingInProcess}
        >
          <Text style={styles.itemRemove}>
            { !stateRemovingInProcess ? `Remove Item` : `Updating... `}
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
