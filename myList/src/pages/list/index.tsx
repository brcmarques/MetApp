import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { themas } from '../../global/themes';

export default function List() {
 return (
   <View style={styles.container}>
    <Text>Hello World!</Text>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})