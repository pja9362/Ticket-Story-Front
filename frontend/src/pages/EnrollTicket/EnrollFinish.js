import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import ticket from '../../images/ticket.png';

const EnrollFinish = () => {
    return (
        <View style={styles.container}>
            <Image source={ticket} style={styles.image} />
            <Text style={styles.mainText}>나의 티켓스토리가 등록되었어요.</Text>
            <Text style={styles.subText}>등록한 티켓은 티켓북에서 확인할 수 있어요.</Text>
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
});

export default EnrollFinish;