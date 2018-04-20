import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'slateblue',
    justifyContent: 'center',
  },
});

export default () => (
  <View style={styles.screen}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);
