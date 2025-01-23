import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";
import { Colors } from "react-native/Libraries/NewAppScreen";



export const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    boxTop:{
        height: Dimensions.get('window').height/3,
        width: '100%',
        //backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    logo:{
        width: 80,
        height: 80
        
    },
    title:{
        fontWeight: 'bold',
        marginTop: 40,
        fontSize: 18
    },
    boxMid:{
        height: Dimensions.get('window').height/4,
        width: '100%',
        paddingHorizontal: 37,
        marginBottom: 50
        
    },
    boxBotton:{
        height: Dimensions.get('window').height/3,
        width: '100%',
        alignItems: 'center',
    },
    
    
    textBotton:{
        fontSize: 15,
        color: themas.colors.gray,
        marginTop: '30%'
    },
    
})