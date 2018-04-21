import React from 'react';
import {
  View,
  Button,
  AsyncStorage,
  Alert,
} from 'react-native';
import SignOutButton from '../containers/containerSignOutButton';
import { persistor } from '../../store/configureStore';
import RefreshMenuWidget from '../containers/containerRefreshMenuWidget';


export default ({ navigation, purgeCart }) => {
  function _resetApp() {
    AsyncStorage.clear();
    purgeCart();
    persistor.purge()
      .then(() => {
        persistor.flush();
      })
      .then(() => {
        navigation.navigate('Welcome');
        alert('Cart and Credential Data Cleared.');
      });
  }

  function _resetConfirm() {
    Alert.alert(
      'Are you sure you want to reset the app and clear all data?',
      '',
      [
        { text: 'Cancel' },
        { text: 'Clear Data', onPress: _resetApp },
      ],
      { cancelable: false });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
      <RefreshMenuWidget />
      <SignOutButton navigation={navigation} />
      <View >
        <Button title="Clear User Data" onPress={_resetConfirm} />
      </View>
    </View>

  );
};
