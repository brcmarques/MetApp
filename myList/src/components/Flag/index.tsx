import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { themas } from '../../global/themes';

type Props = {
    color: string,
    caption: string,
    selected: boolean
}

export function Flag({...rest}:Props) {
 return (
   <View 
    style={
        [styles.container,
            {backgroundColor: rest?.color},
            rest?.selected && {borderWidth:2}
        ]
    }
   
   >
    <Text style={{color:'#FFF'}}>{rest.caption}</Text>
   </View>
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