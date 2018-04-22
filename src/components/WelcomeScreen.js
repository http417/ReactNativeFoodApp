import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { SIGN_UP_SCREEN, SIGN_IN_SCREEN } from '../tools/constants';
import AutoRefreshServerDataWidget from './widgets/AutoRefreshServerDataWidget';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  signButtonSection: {
    flex: 8,
    justifyContent: 'flex-start',
  },
  signButton: {
    width: 300,
    marginBottom: 50,
  },
  title: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    flex: 2,
    paddingTop: 60,
    fontWeight: 'bold',
  },
});

export default ({ navigation }) => (
  <View style={styles.container}>
    <AutoRefreshServerDataWidget />
    <Text style={styles.title}>
      Hungry?
    </Text>
    <View style={styles.signButtonSection}>
      <View style={styles.signButton}>
        <Button title="Sign Up" onPress={() => navigation.navigate(SIGN_UP_SCREEN)} />
      </View>
      <View style={styles.signButton}>
        <Button title="Sign In" onPress={() => navigation.navigate(SIGN_IN_SCREEN)} />
      </View>
    </View>
  </View>
);
