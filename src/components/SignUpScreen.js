import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, Alert } from 'react-native';
import actions from '../store/actions';
import CredentialsWidget from './widgets/CredentialsWidget';
import { APP_STACK } from '../tools/constants';

const SignUpScreen = ({ storeAuthToken, navigation }) => {
  function _onSubmit(number, password) {
    // check if number already entered
    AsyncStorage.getItem(`ACCOUNT:${number}`)
      .then((storedAccountNumber) => {
        if (storedAccountNumber) {
          Alert.alert('An account with this number already exists');
        } else { // continue with validation
          AsyncStorage.setItem(`ACCOUNT:${number}`, password);
          storeAuthToken(number);
          navigation.navigate(APP_STACK);
        }
      })
      .catch((error) => {
        console.log('Server Signup Error: ', error);
        Alert.alert('Server Error: Please try again later ');
      });
  }
  return <CredentialsWidget onSubmit={_onSubmit} isSigningUp />;
};

const mapDispatchToProps = dispatch => ({
  storeAuthToken: (token) => {
    dispatch(actions.storeAuthToken(token));
  },
});

export default connect(null, mapDispatchToProps)(SignUpScreen);
