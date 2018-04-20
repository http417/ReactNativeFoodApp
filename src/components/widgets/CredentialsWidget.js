import React from 'react';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';
import PhoneInput from './PhoneInput';
import PasswordInput from './PasswordInput';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
});

const validation = {
  isPHValid: (text) => {
    if (isNaN(text)) { // eslint-disable-line
      return false;
    }
    return true;
  },
  isPasswordValid: (text) => {
    const re = /^[0-9a-zA-Z]+$/;

    if (!re.test(text)) {
      return false;
    }
    return true;
  },
};

class CredentialsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      password: '',
      submitReady: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // check if the submit button should be enabled or disabled, but only of tje
    if (this.state.submitReady === prevState.submitReady) {
      this._checkSubmitReadiness();
    }
  }

  _onPHChange = (text) => {
    if (validation.isPHValid(text)) {
      this.setState({ number: text.trim() });
      this._checkSubmitReadiness();
    }
  }
  _onPasswordChange = (text) => {
    this.setState({ password: text });
    this._checkSubmitReadiness();
  }

  _checkSubmitReadiness = () => {
    if (this.state.number.length === 10
      && this.state.password.length === 6
      && !this.state.submitReady) {
      this.setState({ submitReady: true });
    } else if (this.state.submitReady) {
      this.setState({ submitReady: false });
    }
  }

  _onSubmit = () => {
    if (this.props.isSigningUp) {
      // do additioanal check to see if password is valid input
      if (!validation.isPasswordValid(this.state.password)) {
        this.setState({ password: '' });
        alert('password may only contain numbers and a-z,A-Z characters');
        return;
      }
    }
    this.props.onSubmit(this.state.number, this.state.password);
  }

  render() {
    return (
      <View style={styles.container}>
        <PhoneInput onNumberChange={this._onPHChange} numberText={this.state.number} />
        <PasswordInput
          onPasswordChange={this._onPasswordChange}
          editable={this.state.number.length === 10}
          passwordText={this.state.password}
        />
        <Button
          title="Sign In"
          disabled={!this.state.submitReady}
          onPress={this._onSubmit}
        />
      </View>
    );
  }
}

export default CredentialsWidget;
