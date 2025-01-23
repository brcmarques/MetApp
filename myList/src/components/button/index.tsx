import React from "react";
import { TouchableHighlightProps, TouchableOpacity, StyleSheet, ActivityIndicator, Text } from "react-native";
import { themas } from "../../global/themes";


type Props = TouchableHighlightProps & {
    text: string,
    loading?:boolean
}

export function Button({...rest}:Props){
    return (
        <TouchableOpacity style={style.button} {...rest} activeOpacity={0.6}>
            {rest.loading?<ActivityIndicator/> : <Text style={style.buttonText}>{rest.text}</Text>}
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    button:{
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themas.colors.primary,
        borderRadius: 40,
        shadowOffset:{
            width:0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    buttonText:{
        fontWeight: 'bold',
        color: themas.colors.secondary
    },
})