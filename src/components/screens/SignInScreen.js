import React from 'react';
import {
  AsyncStorage,
} from 'react-native';
import CredentialsWidget from '../widgets/CredentialsWidget';

class SignInScreen extends React.Component {
  static navigationOptions = () => ({ title: 'Sign In' })

  _onSubmit = (number, password) => {
    AsyncStorage.getItem(`ACCOUNT:${number}`).then((keyValue) => {
      if (keyValue === password) {
        this.props.signIn(number);
        this.props.navigation.navigate('App');
      } else {
        alert("Credentials Failed");
      }
    })
      .catch((error) => {
        console.log('user token fetching error: ', error);
      });
  }

  render() {
    return (
      <CredentialsWidget isSigningUp={false} onSubmit={this._onSubmit} />
    );
  }
}

export default SignInScreen;
