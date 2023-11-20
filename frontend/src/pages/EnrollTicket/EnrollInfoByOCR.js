import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ticket from '../../images/ticket_white.png';

const EnrollInfoByOCR = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Image source={ticket} style={styles.image} />
            <Text style={styles.mainText}>직접 관람한 티켓의{'\n'}제목과 좌석 정보가{'\n'}잘 나오게 찍어주세요.</Text>

            {/* 임시 버튼 */}
            <View style={{flexDirection: 'row', gap: 20, marginVertical: 20}}>
                <TouchableOpacity style={{backgroundColor: 'black', padding: 15}} onPress={()=> navigation.navigate('EnrollInfoByOCR')}>
                    <Text style={{color: '#fff'}}>카메라</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: 'black', padding: 15}} onPress={()=> navigation.navigate('OCRFail')}>
                    <Text style={{color: '#fff'}}>인식 실패</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        opacity: 0.5,
        alignItems:'center',
        justifyContent: 'center',
    },
    image: {
        width: 86,
        height: 122,
    },
    mainText: {
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 24,
        color: '#fff',
        textAlign: 'center',
        marginTop: 40,
    }
});

export default EnrollInfoByOCR;