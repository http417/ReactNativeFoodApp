import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  AsyncStorage,
  Alert,
  Text,
} from 'react-native';
import LogoHeader from '../widgets/LogoHeader';
import { persistor } from '../../store/configureStore';
import RefreshMenuWidget from '../containers/containerRefreshMenuWidget';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 50,
  },
  signButton: {
    width: 300,
    marginTop: 25,
  },
  title: {
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: () => (<LogoHeader />),
  }

  _resetApp = () => {
    AsyncStorage.clear();
    this.props.purgeCart();
    persistor.purge()
      .then(() => {
        persistor.flush();
      })
      .then(() => {
        alert('Cart and Credential Data Cleared.');
      });
  }

  _resetConfirm = () => {
    Alert.alert(
      'Are you sure you want to reset the app and clear all data?',
      '',
      [
        { text: 'Cancel' },
        { text: 'Clear Data', onPress: this._resetApp },
      ],
      { cancelable: false });
  }


  render() {
    return (
      <View style={styles.container}>
        <RefreshMenuWidget />
        <Text style={styles.title}>
          Hungry?
        </Text>
        <View style={styles.signButton}>
          <Button title="Sign Up" onPress={() => this.props.navigation.navigate('SignUp')} />
        </View>
        <View style={styles.signButton}>
          <Button title="Sign In" onPress={() => this.props.navigation.navigate('SignIn')} />
        </View>
        <View style={{ flex: 0.75, justifyContent: 'flex-end' }}>
          <Button title="Clear User Data" onPress={this._resetConfirm} />
        </View>
      </View>
    );
  }
}

export default WelcomeScreen;
