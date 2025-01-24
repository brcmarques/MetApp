import React, { useContext } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons'
import { themas } from '../../global/themes';
import { AuthContextList } from '../../context/authContext_list';

interface TabBarProps {
    state: {
      index: number;
    };
    navigation: {
      navigate: (screenName: string) => void;
    };
  }

export default ({state, navigation}:TabBarProps) => {

    const {onOpen} = useContext<any>(AuthContextList) 

    const go = (screenName:string) => {

        navigation.navigate(screenName)
        
    }
    
 return (
   <View style = {styles.tabArea}>
    <TouchableOpacity style = {styles.tabItem} onPress={() => go("List")}>
        <AntDesign
            name='bars'
            style={{opacity:state.index === 0?1:0.5,color:themas.colors.primary, fontSize:32}}
        />
    </TouchableOpacity>
    <TouchableOpacity style = {styles.tabItemButton} onPress={() => onOpen()}>
        <View style = {{width: '100%', left: 10, top: 4}}>
            <Entypo
                name='plus'
                size={40}
                color={'#FFF'}
            />
        </View>
        <View style={{flexDirection:'row-reverse', width:'100%', right: 10, bottom: 10 }}>
            <MaterialIcons
                name='edit'
                color={'#FFF'}
                size={30}
            />
        </View>

    </TouchableOpacity>
    <TouchableOpacity style = {styles.tabItem} onPress={() => go("User")}>
    <FontAwesome
            name='user'
            style={{opacity:state.index === 1?1:0.2,color:themas.colors.primary, fontSize:32}}
        />

    </TouchableOpacity>
   </View>
  );
}
const styles = StyleSheet.create({
    tabArea:{
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-around',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,

    },
    tabItem:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabItemButton:{
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        zIndex: 9999,
        top: -30,
        backgroundColor: themas.colors.primary
    }
})