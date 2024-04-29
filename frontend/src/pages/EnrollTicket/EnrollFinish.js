import React from 'react';
import {View, Image, StyleSheet, Text, Button} from 'react-native';
import ticket from '../../images/ticket.png';


const EnrollFinish = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Image source={ticket} style={styles.image} />
            <Text style={styles.mainText}>나의 티켓스토리가 등록되었어요.</Text>
            <Text style={styles.subText}>등록한 티켓은 티켓북에서 확인할 수 있어요.</Text>


            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    title="홈으로 가기"
                    onPress={() => navigation.navigate('MainStack')} />
                <Button 
                    style={styles.button}
                    title="티켓북 보기"
                    onPress={() => navigation.navigate('TicketBook')} />
                <Button
                    style={styles.button}
                    title="티켓 추가 등록하기"
                    onPress={() => {}} />
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
        marginTop: 40,
        paddingHorizontal: 40,
    },
});

export default EnrollFinish;