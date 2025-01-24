import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
    color: string
}

export default function Ball({...rest}) {
 return (
   <View
    style={[styles.ball,{borderColor:rest.color || 'gray'}]}
    />
  )
}

const styles = StyleSheet.create({
    ball:{
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1
    }
})