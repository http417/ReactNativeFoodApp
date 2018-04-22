import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { APP_STACK, AUTH_STACK } from '../tools/constants';
import AutoRefreshServerDataWidget from './widgets/AutoRefreshServerDataWidget';

const RootSwitcherScreen = ({ navigation, authToken }) => {
  // for now, token is valid simply if it exists
  function authTokenValid() { return !!authToken; }

  // navigate to app stack if user token found and validated, else go to Welcome Screen
  navigation.navigate(authTokenValid() ? APP_STACK : AUTH_STACK);
  return (
    <View style={{
      flex: 1,
      backgroundColor: 'slateblue',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <AutoRefreshServerDataWidget />
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

RootSwitcherScreen.propTypes = {
  authToken: PropTypes.string.isRequired,
};

// =================== CONNECT TO REDUX STORE ==================== //
export default connect(state => ({ authToken: state.user.authToken }), null)(RootSwitcherScreen);
