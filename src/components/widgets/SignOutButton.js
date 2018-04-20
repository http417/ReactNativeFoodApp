import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonText: {
    backgroundColor: 'slategray',
    color: 'white',
    padding: 6,
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 6,
    borderRadius: 5,
  },
});

class SignOutButton extends React.Component {
  _signOut = () => {
    // clear out the user token
    this.props.signOut();
    this.props.navigation.navigate('Auth');
  }

  render = () => (
    <TouchableHighlight onPress={this._signOut}>
      <View>
        <Text style={styles.buttonText}>Sign Out</Text>
      </View>
    </TouchableHighlight>
  )
}

export default SignOutButton;
