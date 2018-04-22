import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AsyncStorage, Alert } from 'react-native';
import CredentialsWidget from './widgets/CredentialsWidget';
import actions from '../store/actions';
import { APP_STACK } from '../tools/constants';

const SignInScreen = ({ storeAuthToken, navigation }) => {
  function _onSubmit(number, password) {
    AsyncStorage.getItem(`ACCOUNT:${number}`)
      .then((storedPassword) => {
        if (storedPassword === password) {
          storeAuthToken(number);
          navigation.navigate(APP_STACK);
        } else {
          Alert.alert("Credentials Failed");
        }
      })
      .catch(error => console.log('user token fetching error: ', error));
  }
  return (<CredentialsWidget isSigningUp={false} onSubmit={_onSubmit} />);
};

SignInScreen.propTypes = {
  storeAuthToken: PropTypes.func.isRequired,
};

// ================ CONNECT TO REDUX STORE =============== //
const mapDispatchToProps = dispatch => ({
  storeAuthToken: (token) => {
    dispatch(actions.storeAuthToken(token));
  },
});

export default connect(null, mapDispatchToProps)(SignInScreen);
