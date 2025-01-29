import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Text, View, Alert, Dimensions, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { Input } from '../components/input';
import { themas } from '../global/themes';
import { Flag } from '../components/Flag';
import CustomDateTimePicker from '../components/CustomDateTimePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContextList:any = createContext({});

const flag = [
    { caption: 'urgente', color: themas.colors.red },
    { caption: 'opcional', color: themas.colors.blueLight }
]

export const AuthProviderList = (props:any): any => {
    const modalizeRef = useRef<Modalize>(null);
    const [title, setTitle] = useState ('');
    const [description, setDescription] = useState('');
    const [selectedFlag, setSelectedFlag] = useState('urgente');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showDatePicker, setshowDatePicker] = useState(false);
    const [showTimePicker, setshowTimePicker] = useState(false);
    const [item, setItem] = useState(0);
    const [taskList, setTaskList] = useState([])


    const onOpen = () => {
        modalizeRef?.current?.open();
    }

    const onClose = () => {
        modalizeRef?.current?.close();
    }

    useEffect(() => {
        get_taskList()
    }, [])

    const _renderFlags = () => {
        return (
            flag.map((item, index) => (
                <TouchableOpacity key={index}
                    onPress={() => {
                        setSelectedFlag(item.caption)
                    }}
                >
                    <Flag 
                        caption={item.caption}
                        color={item.color}
                        selected={item.caption == selectedFlag}

                    />
                </TouchableOpacity>
            ))
        )
    }

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };
    
    const handleTimeChange = (date: Date) => {
        setSelectedTime(date);
    };
    
    const handleSave = async () => {
        //await AsyncStorage.removeItem('taskList')
        
        if(!title || !description || !selectedFlag){
            return Alert.alert('Atenção','Prencha todos campos e selecione a necessidade')
        }
        try {
            const newItem = {
                item: Date.now(),
                title: title,
                description: description,
                flag: selectedFlag,
                timeLimit: new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate(),
                    selectedTime.getHours(),
                    selectedTime.getMinutes()
                ).toISOString(),
            }

            const storageData = await AsyncStorage.getItem('taskList');
            let taskList = storageData ? JSON.parse(storageData):[]

            //console.log(storageData)
            
            taskList.push(newItem)

            await AsyncStorage.setItem('taskList',JSON.stringify(taskList))
            
            setTaskList(taskList)

            setData()
            onClose()

        } catch (error){console.log("Erro ao salvar o item", error);
        }

    }

    const setData = () => {
        setTitle('')
        setDescription('')
        setSelectedFlag('urgente')
        setItem(0)
        setSelectedDate(new Date());
        setSelectedTime(new Date());
        
    }

    async function get_taskList() {
        try {
            const storageData = await AsyncStorage.getItem('taskList');
            const taskList = storageData ? JSON.parse(storageData):[]
            setTaskList(taskList)
        }catch (error){
            console.log('Erro', error)
        }     
    }
    

    const handleDelete = async (itemToDelete: any) => {
        try {
            const storageData = await AsyncStorage.getItem('taskList')
            const taskList:Array<any> = storageData ? JSON.parse(storageData):[]

            const updateTaskList = taskList.filter(item => item.item !== itemToDelete.item)
            
            await AsyncStorage.setItem('taskList', JSON.stringify(updateTaskList))
            setTaskList(updateTaskList)

        }catch (error) {
            console.log('Erro ao excluir o intem', error)
        }
    }

    const handleEdit = async(itemToDelete) => {
        try {
            
        } catch (error) {
            
        }
    }
    
    const _container = () => {
        return (
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === 'ios'?'padding':'height'}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => onClose()}>
                        <MaterialIcons
                            name='close'
                            size={30}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>Criar tarefa</Text>
                    <TouchableOpacity onPress={() => handleSave()}>
                        <AntDesign
                            name='check'
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <Input 
                        title='Titulo:'
                        labelStyle={styles.label}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <Input 
                        title='Descrição:'
                        labelStyle={styles.label}
                        height={100}
                        multiline
                        numberOfLines={5}
                        value={description}
                        onChangeText={setDescription}
                        textAlignVertical='top'
                    />

                    <View style={{width:'40%'}}>
                        <View style={{flexDirection: 'row', gap: 10, width: '100%'}}>
                            <TouchableOpacity onPress={() => setshowDatePicker(true)} style={{width: 200}}>
                                <Input
                                    title='Data'
                                    labelStyle={styles.label}
                                    editable={false}
                                    value={selectedDate.toLocaleDateString()}
                                    onPress={() => setshowDatePicker(true)}
                                />

                            </TouchableOpacity>
                            <TouchableOpacity style={{width: 120}} onPress={() => setshowTimePicker(true)}>
                                <Input
                                    title='Tempo'
                                    labelStyle={styles.label}
                                    editable={false}
                                    value={selectedTime.toLocaleTimeString()}
                                    onPress={() => setshowTimePicker(true)}
                                />

                            </TouchableOpacity>
                        </View>
                        <CustomDateTimePicker 
                            onDateChange={handleDateChange}
                            setShow={setshowDatePicker}
                            show={showDatePicker}
                            type={'date'}
                        />
                        <CustomDateTimePicker 
                            onDateChange={handleTimeChange}
                            setShow={setshowTimePicker}
                            show={showTimePicker}
                            type={'time'}
                        />
                    </View>
                    <View style={styles.containerFlag}>
                        <Text style={styles.label}> Necessidade: </Text>
                        <View style={styles.rowFlags}>
                            {_renderFlags()}
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
    const windowHeight = Dimensions.get('window').height / 1.5;

    return (
        <AuthContextList.Provider value={{onOpen, taskList, handleDelete}}>
            {props.children}
            <Modalize 
                ref={modalizeRef}
                childrenStyle={{ height: windowHeight }}
                adjustToContentHeight={true}
            >
                {_container()}
            </Modalize>
        </AuthContextList.Provider>
    )
}

export const useAuth = () => useContext(AuthContextList);

const styles = StyleSheet.create({
    container:{
        width: '100%'
    },
    header:{
        width: '100%',
        height: 40,
        paddingHorizontal: 40,
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    content:{
        width: '100%',
        paddingHorizontal: 20
    },
    containerFlag:{
        width: '100%',
        padding: 10
    },
    label:{
        fontWeight: 'bold',
        color: '#000'
    },
    rowFlags:{
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    }
})