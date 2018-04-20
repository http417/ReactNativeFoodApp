import React from 'react';
import {
  AsyncStorage,
} from 'react-native';
import CredentialsWidget from '../widgets/CredentialsWidget';


class SignUpScreen extends React.Component {
  static navigationOptions = () => ({ title: 'Sign Up' })

  _onSubmit = (number, password) => {
    // check if number already entered
    AsyncStorage.getItem(`ACCOUNT:${number}`).then((keyValue) => {
      if (keyValue) {
        alert('an account with this number already exists');
      } else { // continue with validation
        AsyncStorage.setItem(`ACCOUNT:${number}`, password);
        this.props.signIn(number);
        this.props.navigation.navigate('App');
      }
    })
      .catch((error) => {
        console.log('Server Signup Error: ', error);
        alert('Server Error: Please try again later ');
      });
  }

  render = () => <CredentialsWidget onSubmit={this._onSubmit} isSigningUp />
}

export default SignUpScreen;
