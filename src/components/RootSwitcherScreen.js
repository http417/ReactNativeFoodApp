import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import RefreshMenuWidget from './widgets/RefreshMenuWidget';
import { APP_STACK, AUTH_STACK } from '../constants/constants';

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
      <RefreshMenuWidget />
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

// =================== CONNECT TO REDUX STORE ==================== //
export default connect(state => ({ authToken: state.user.authToken }), null)(RootSwitcherScreen);
