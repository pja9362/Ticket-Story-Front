import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text, Button, TouchableOpacity} from 'react-native';
import character from '../../images/character_black.png';
import home from '../../images/icon_home.png';
import storycard from '../../images/icon_storycard.png';
import addticket from '../../images/icon_addticket.png';
import { CustomText, CustomTextInput } from '../../components/CustomText';
import BottomSheetMenu from '../../components/EnrollTicket/BottomSheetMenu';

const ChangePWFinish = ({navigation}) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login')
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigation]);
       
    return (
        <>
        <View style={styles.container}>
            <Image source={character} style={styles.image} />
            <CustomText style={styles.mainText} fontWeight="bold"> 비밀번호 변경이 완료되었어요. </CustomText>
            <CustomText style={styles.subText} fontWeight="medium">잠시후 로그인 페이지로 이동합니다.</CustomText>
        </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems:'center',
        justifyContent: 'center',
        bottom: 20
    },
    image: {
        width: 130,
        height: 150,
    },
    mainText: {
        fontSize: 16,
        color: '#525252',
        marginTop: 0,
        marginBottom: 10,
    },
    subText: {
        fontSize: 12,
        color: '#B6B6B6',
    },
});

export default ChangePWFinish;