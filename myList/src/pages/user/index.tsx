import { View, Text, StyleSheet } from 'react-native';

export default function User() {
 return (
   <View style={styles.container}>
    <Text>Hello World2!</Text>
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