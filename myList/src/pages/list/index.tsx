import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useRef } from 'react';
import { themas } from '../../global/themes';
import { Input } from '../../components/input';
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import Ball from '../../components/Ball';
import { Flag } from '../../components/Flag';
import { AuthContextList } from '../../context/authContext_list';
import { formDateToBR } from '../../global/function';
import { Directions, Swipeable } from 'react-native-gesture-handler'
import { Button } from '../../components/button';


export default function List() {

  const {taskList, handleDelete} = useContext<AuthContextType>(AuthContextList)
  const swipeableRefs = useRef<(Swipeable | null)[]>([]);

  const renderLeftActions = () => {
    return (
      <View style={[styles.buttonLeft, {backgroundColor: themas.colors.blueLight}]}>
        <AntDesign
          name='edit'
          size={20}
          color={'black'}
        />
      </View>
    );
  }


  const renderRightActions = () => {
    return (
      
        <View style={styles.buttonRight}>
          <AntDesign
            name='delete'
            size={20}
            color = {'#FFF'}
          />
        </View>
    )
  }

  const handleSwipeOpen = (directions: 'right'|'left', item: any, index : any) => {
    if(directions == 'right'){
      handleDelete(item)
      swipeableRefs.current[index]?.close()

    }else{

    }
  }

  const _renderCard = (item: PropCard, index: number) => {
    const color = item.flag == 'opcional' ? themas.colors.blueLight : themas.colors.red

    return(

      
      <Swipeable
        ref={(ref) => {
          if (ref) swipeableRefs.current[index] = ref;
        }}
        key={index}
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        onSwipeableOpen={(directions) => handleSwipeOpen(directions,item,index)}
      >
        <View style={styles.card}>
          <View style={styles.listItem}>
            <View style={styles.listItemLeft}>

              <Ball 
                color= {color}
              />
              <View>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemDescription}>até {formDateToBR(item.timeLimit)}</Text>

              </View>

            </View>
            <Flag caption={item.flag}
                  color={color} 
                  selected/>
          </View>
        </View>
      </Swipeable>
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
          data={taskList}
          style={{ marginTop: 40, paddingHorizontal: 30 }}
          keyExtractor={(item, index) => item.item.toString()}
          renderItem={({ item, index }) => {return(_renderCard(item, index))}}
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
    paddingHorizontal: 20,
    paddingTop: 20

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
  buttonRight:{
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    marginVertical: 10,
    borderRadius: 10
  },
  buttonLeft:{
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    marginVertical: 10,
    borderRadius: 10
  },
})