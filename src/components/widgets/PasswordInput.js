import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default ({ onPasswordChange, editable, passwordText }) => (
  <View>
    <Text>Password:</Text>
    <TextInput
      value={passwordText}
      placeholder="Enter a 6 character password (a-z,A-Z,0-9)"
      style={{ height: 40 }}
      maxLength={6}
      editable={editable}
      secureTextEntry
      onChangeText={onPasswordChange}
    />
    <Text style={{ fontSize: 10, marginBottom: 20 }}>
      Password characters remaining: {6 - passwordText.length}
    </Text>
  </View>
);

