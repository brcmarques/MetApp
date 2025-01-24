import React, { useState } from "react";
import { View, Text, TextInput, SafeAreaView, Image, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { style } from "./styles";
import Logo from '../../assets/logo.png';
import { MaterialIcons, Octicons } from '@expo/vector-icons'
import { themas } from "../../global/themes";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import List from "../list";
import { useNavigation, NavigationProp } from '@react-navigation/native'






export default function Login(){

  const navigation = useNavigation<NavigationProp<any>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true); // Estado para controlar visibilidade da senha


  async function getLogin() {
    try {
      // Mostrar indicador de carregamento
      setLoading(true);
  
      // Validação de campos obrigatórios
      if (!email || !password) {
        setLoading(false); // Garantir que o indicador de carregamento seja ocultado
        return Alert.alert('Atenção', 'Informe os campos obrigatórios!');
      }
  
      // Simulação de login (você pode substituir por uma chamada de API real)
      const isValidUser =
        email === 'brunomarquesag331@gmail.com' && password === 'bcm12345';
  
      if (isValidUser) {
        // Navegação para a tela principal
        navigation.reset({
          index: 0, // Define a nova rota como a inicial
          routes: [{ name: 'BottomRoutes' }],
        });
        } else {
        Alert.alert('Erro', 'Usuário ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro inesperado. Tente novamente mais tarde.'
      );
    } finally {
      setLoading(false);
    }
  }
  

  return(
    <SafeAreaView style={style.container}>
      <View style={style.boxTop}>
        <Image
          source={Logo} 
          style={style.logo}
          resizeMode="contain"
        />
        <Text style={style.title}> Bem vindo! </Text>
      </View>
      <View style={style.boxMid}>
        
        <Input 
          title="Endereço de email:"
          iconRightName="email"
          IconRight={MaterialIcons}
        

          value={email}
          onChangeText={setEmail}
        />
         <Input 
          title="Digite sua senha:"
          iconRightName={showPassword?"eye-closed":"eye"}
          IconRight={Octicons}

          secureTextEntry={showPassword}
          onIconRightPress={() => setShowPassword(!showPassword)}

          value={password}
          onChangeText={setPassword}
         />

      </View>
      <View style={style.boxBotton}>
      
        <Button
          text="ENTRAR"
          loading={loading}
          onPress={() => getLogin()}
        />

        <Text style={style.textBotton}>Não tem uma conta? <Text style={{color: themas.colors.primary}}>Crie sua conta!</Text></Text>


      </View>
    </SafeAreaView>
  )
}








