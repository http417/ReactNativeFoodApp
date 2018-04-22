import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import RefreshMenuWidget from './widgets/RefreshMenuWidget';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    <RefreshMenuWidget />
    <Text style={styles.title}>
      Hungry?
    </Text>
    <View style={styles.signButtonSection}>
      <View style={styles.signButton}>
        <Button title="Sign Up" onPress={() => navigation.navigate('SignUpScreen')} />
      </View>
      <View style={styles.signButton}>
        <Button title="Sign In" onPress={() => navigation.navigate('SignInScreen')} />
      </View>
    </View>
  </View>
);
