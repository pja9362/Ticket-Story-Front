import React from 'react';
import {View, Image, StyleSheet, Text, Button, TouchableOpacity} from 'react-native';
import ticket from '../../images/ticket.png';
import { CustomText, CustomTextInput } from '../../components/CustomText';

const EnrollFinish = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Image source={ticket} style={styles.image} />
            <CustomText style={styles.mainText}>나의 티켓스토리가 등록되었어요.</CustomText>
            <CustomText style={styles.subText}>등록한 티켓은 티켓북에서 확인할 수 있어요.</CustomText>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={{...styles.navButton, backgroundColor: '#5D70F9' }} onPress={() => navigation.navigate('MainStack')}>
                    <CustomText style={{...styles.btnText, color: '#fff'}}>홈으로 가기</CustomText>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('TicketBook')}>
                    <Text style={styles.btnText}>티켓북으로 가기</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('EnrollTicket')}>
                    <CustomText style={styles.btnText}>티켓 추가 등록하기</CustomText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems:'center',
        justifyContent: 'center',
    },
    image: {
        width: 86,
        height: 122,
    },
    mainText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 40,
        marginBottom: 20,
    },
    subText: {
        fontSize: 14,
        color: '#000',
    },
    buttonContainer: {
        marginTop: '20%',
        paddingHorizontal: 40,
        width: '100%',
        gap: 16
    },
    navButton: {
        backgroundColor: '#EEEEEE',
        paddingHorizontal: 18,
        paddingVertical: 15,
        borderRadius: 10,
    },
    btnText: {
        color: '#000',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default EnrollFinish;