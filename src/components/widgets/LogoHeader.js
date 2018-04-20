import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CartWidget from './CartWidget';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingLeft:10,
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
});

export default ({ signedIn }) => (
  <View style={styles.container}>
    <Image
      style={styles.headerImage}
      source={require('./logo2.png')} // eslint-disable-line
    />
    { signedIn && <CartWidget darkTheme />}
  </View>
);

