import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default ({ onNumberChange, numberText }) => (
  <View>
    <Text>Phone Number: </Text>
    <TextInput
      ref={(input) => { this.phinput = input; }}
      value={numberText}
      placeholder="Enter lasts 10 digit of phone number."
      style={{ height: 40 }}
      keyboardType="phone-pad"
      maxLength={10}
      onChangeText={onNumberChange}
    />
    <Text style={{ fontSize: 10, marginBottom: 20 }} >
      Phone number characters remaining: {10 - numberText.length}
    </Text>
  </View>
);
