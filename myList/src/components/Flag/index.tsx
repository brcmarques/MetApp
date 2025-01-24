import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { themas } from '../../global/themes';

type Props = {
    color: string,
    caption: string
}

export function Flag({...rest}:Props) {
 return (
   <TouchableOpacity style={[styles.container,{backgroundColor: rest?.color}]}>
    <Text style={{color:'#FFF'}}>{rest.caption}</Text>
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        width: 70,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themas.colors.red,
        borderRadius: 4

    },
})