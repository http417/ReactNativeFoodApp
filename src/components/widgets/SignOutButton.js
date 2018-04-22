import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import actions from '../../store/actions';

const styles = StyleSheet.create({
  buttonText: {
    backgroundColor: 'slategray',
    color: 'white',
    padding: 6,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 6,
    borderRadius: 5,
  },
});

const SignOutButton = ({ clearAuthToken, navigation }) => {
  function _signOut() {
    // clear out the user token
    clearAuthToken();
    navigation.navigate('AuthStack');
  }
  return (
    <TouchableHighlight onPress={_signOut}>
      <View>
        <Text style={styles.buttonText}>Sign Out</Text>
      </View>
    </TouchableHighlight>
  );
};

// =================== CONNECT TO REDUX STORE ==================== //
const mapDispatchToProps = dispatch => ({
  // essentially we are just clearing out the stored Auth Token
  clearAuthToken: () => {
    dispatch(actions.clearAuthToken());
  },
});

export default connect(null, mapDispatchToProps)(SignOutButton);
