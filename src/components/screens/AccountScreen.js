import React from 'react';
import { View } from 'react-native';
import SignOutButton from '../containers/containerSignOutButton';

export default ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><SignOutButton navigation={navigation} /></View>
);
