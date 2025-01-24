import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { themas } from '../../global/themes';
import { Input } from '../../components/input';
import { MaterialIcons } from '@expo/vector-icons'
import Ball from '../../components/Ball';
import { Flag } from '../../components/Flag';

type PropCard = {
  item: number,
  title: string,
  description:string,
  flag: 'urgente' | 'opcional'
}

const data: Array<PropCard> = [
  {
    item: 0,
    title: 'Realizar a lição de casa!',
    description: 'página 10 a 20',
    flag: 'urgente',
  },
  {
    item: 1,
    title: 'Passear com cachorro!',
    description: 'página 10 a 20',
    flag: 'urgente',
  },
  {
    item: 2,
    title: 'Sair para tomar açai!',
    description: 'página 10 a 20',
    flag: 'urgente',
  },
];

export default function List() {

  const _renderCard = (item:PropCard)=>{
    return(
      <TouchableOpacity style={styles.card}>
        <View style={styles.listItem}>
          <View style={styles.listItemLeft}>

            <Ball 
              color= 'red'
            />
            <View>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>

          </View>
          <Flag caption='Urgente' color={themas.colors.red}/>
        </View>
      </TouchableOpacity>
    )
  }

  return (
   <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Bom dia <Text style={{fontWeight:'bold'}}>Bruno Marques</Text></Text>
      <View style={styles.boxInput}>
        <Input
          IconLeft={MaterialIcons}
          iconLeftName='search'
          
        />
      </View>
      
    </View>
    <View style={styles.boxList}>
    <FlatList
          data={data}
          style={{ marginTop: 40, paddingHorizontal: 30 }}
          keyExtractor={(item, index) => item.item.toString()}
          renderItem={({ item, index }) => {return(_renderCard(item))}}
        />
    </View>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
  },
  header:{
    width: '100%',
    backgroundColor: themas.colors.primary,
    height: Dimensions.get('window').height/6,
    justifyContent: 'center',
    paddingHorizontal: 20

  },
  title:{
    fontSize: 20,
    color: '#FFF',
    marginTop: 20,
  },
  boxInput:{
    flex: 1,
    width: '80%'
  },
  boxList:{
    flex: 1,
    width: '100%'
  },
  card:{
    width: '100%',
    height: 60,
    backgroundColor: '#FFF',
    marginTop:6,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: themas.colors.lightGray
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  listItemLeft:{
    width: '70%',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',

  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemDescription: {
    color: themas.colors.gray
  },
})