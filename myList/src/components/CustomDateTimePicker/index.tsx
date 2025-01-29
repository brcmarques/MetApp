import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, Platform, Text } from 'react-native';
import { themas } from '../../global/themes';
import DateTimePicker from '@react-native-community/datetimepicker';

type CustomDateTimePickerProps = {
    type: 'date' | 'time'; // Define que o type pode ser apenas "date" ou "time".
    onDateChange: (date: Date) => void; // Função chamada quando a data é alterada.
    show: boolean; // Define se o Modal está visível.
    setShow: (value: boolean) => void; // Função para alterar o estado de visibilidade.
};

export default function CustomDateTimePicker({
    type,
    onDateChange,
    show,
    setShow,
}: CustomDateTimePickerProps) {
    const [date, setDate] = useState(new Date());

    useEffect(() =>{
        if(onDateChange){
            onDateChange(date)
        }
        
    }, [date, onDateChange])

    const onChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShow(false);
        onDateChange(currentDate); // Notifica o componente pai sobre a data selecionada.
    };

    return (
        <Modal
            transparent={true}
            visible={show}
            onRequestClose={() => setShow(false)}
        >
            <View style={styles.modalOverlay}>
                <View
                    style={[
                        styles.container,
                        Platform.OS === 'android' && { backgroundColor: 'transparent' }
                    ]}
                >
                    <DateTimePicker
                        value={date}
                        mode={type}
                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        onChange={onChange}
                    />
                    <Text style={styles.dataText}>
                        {type === 'date'
                            ? date.toLocaleDateString()
                            : date.toLocaleTimeString()}
                    </Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themas.colors.transparent,
    },
    container: {
        width: '80%',
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 10,
        elevation: 5,
    },
    dataText: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
        color: themas.colors.primary,
    },
});
