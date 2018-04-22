import React from 'react';
import { View, Button, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import actions from '../store/actions';
import SignOutButton from './widgets/SignOutButton';
import CartWidget from './widgets/CartWidget';
import { persistor } from '../store/configureStore';
import { AUTH_STACK } from '../constants/constants';

class AccountScreen extends React.Component {
  static navigationOptions =({ navigation }) => ({
    title: 'Account Settings',
    headerRight: <CartWidget navigation={navigation} />,
  });

  _resetApp = () => {
    Promise.all(
      this.props.resetApp(),
      AsyncStorage.clear(),
      persistor.purge().then(() => persistor.flush()),
    )
      .then(() => {
        this.props.navigation.navigate(AUTH_STACK);
        Alert.alert('Cart and Credential Data Cleared');
      })
      .catch(() => {
        Alert.alert('Sorry', 'Unable to reset the app at this time.');
      });
  }

  _resetConfirm = () => {
    Alert.alert(
      'Are you sure you want to reset the app and clear all data?', '',
      [{ text: 'Cancel' },
        { text: 'Clear Data', onPress: this._resetApp }],
      { cancelable: false });
  }

  render = () => (
    <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
      <SignOutButton navigation={this.props.navigation} />
      <View >
        <Button title="Clear User Data" onPress={this._resetConfirm} />
      </View>
    </View>
  );
}

// ================ CONNECT TO REDUX STORE =============== //

const mapDispatchToProps = dispatch => ({
  resetApp: () => Promise.all(
    dispatch(actions.purgeCart()),
    dispatch(actions.purgeMenu()),
    dispatch(actions.clearAuthToken()),
  ),
});

export default connect(null, mapDispatchToProps)(AccountScreen);
