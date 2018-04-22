import React from 'react';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  headerImage: {
    height: 60,
    width: 140,
    marginBottom: 20,
  },
});

// consider adding the refresh widget to this screen for a refresh check
export default () => (
  <View style={styles.screen}>
    <Image
      style={styles.headerImage}
      source={require('./widgets/logo2.png')} // eslint-disable-line
    />
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);
