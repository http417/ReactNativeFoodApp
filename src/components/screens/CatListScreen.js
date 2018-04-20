import React from 'react';
import { View, Text, FlatList, TouchableHighlight, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  catButton: {
    backgroundColor: 'lightsteelblue',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    borderWidth: 0.5,
    borderColor: '#000000',
    paddingLeft: 20,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default ({ foodStore, navigation }) => {
  const { rawCategoryData } = foodStore;
  const itemClicked = (catID, catName) => {
    navigation.navigate('CategoryScreen', {
      id: catID,
      name: catName,
    });
  };
  return (
    <View>
      <FlatList
        data={Object.values(rawCategoryData)}
        renderItem={
          ({ item }) => (
            <TouchableHighlight
              style={styles.catButton}
              onPress={() => itemClicked(item.id, item.name)}
            >
              <Text style={styles.buttonText}>{item.name}</Text>
            </TouchableHighlight>
          )
        }
      />
    </View>
  );
};

