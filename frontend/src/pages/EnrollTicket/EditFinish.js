import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text, Button, TouchableOpacity} from 'react-native';
import character from '../../images/character_black.png';
import home from '../../images/icon_home.png';
import storycard from '../../images/icon_storycard.png';
import addticket from '../../images/icon_addticket.png';
import { CustomText, CustomTextInput } from '../../components/CustomText';
import BottomSheetMenu from '../../components/EnrollTicket/BottomSheetMenu';

const EditFinish = ({navigation, route}) => {

    const { ticket, ticketId } = route.params;


    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('TicketDetail', {ticketId: ticketId, title: ticket.contentsDetails.title, date : ticket.contentsDetails.date, time: ticket.contentsDetails.time, location: ticket.contentsDetails.location})
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigation]);
       
    return (
        <>
        <View style={styles.container}>
            <Image source={character} style={styles.image} />
            <CustomText style={styles.mainText} fontWeight="medium"> 수정이 완료되었어요.</CustomText>
            <CustomText style={styles.subText}>잠시후 스토리 카드로 이동할게요.</CustomText>
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
        fontSize: 18,
        color: '#525252',
        marginTop: 0,
        marginBottom: 10,
    },
    subText: {
        fontSize: 14,
        color: '#B6B6B6',
    },
});

export default EditFinish;