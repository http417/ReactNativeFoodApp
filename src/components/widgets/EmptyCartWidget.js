import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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

export default ({ goToMenu }) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyContainerText}>Your cart is empty.  How about your stomach?</Text>
    <View>
      <Button title="Continue Shopping" onPress={goToMenu} />
    </View>
  </View>
);
