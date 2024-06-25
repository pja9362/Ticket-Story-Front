import React, {useState} from 'react';
import {View, Image, StyleSheet, Text, Button, TouchableOpacity} from 'react-native';
import ticket from '../../images/character_black.png';
import home from '../../images/icon_home.png';
import storycard from '../../images/icon_storycard.png';
import addticket from '../../images/icon_addticket.png';
import { CustomText, CustomTextInput } from '../../components/CustomText';
import BottomSheetMenu from '../../components/EnrollTicket/BottomSheetMenu';

const EnrollFinish = ({navigation}) => {

    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

    const openBottomSheet = () => {
        setBottomSheetVisible(true);
    };
    
    const closeBottomSheet = () => {
    setBottomSheetVisible(false);
    };

    const onClick = (action) => {
    if (action === 'scrape') navigation.navigate('EnrollByScrape', {action});
    else navigation.navigate('EnrollAgreement', { action });
    closeBottomSheet();
    }

    const hi = () => {
        alert('만드는 중..');
    }

    return (
        <>
        <View style={styles.container}>
            <Image source={ticket} style={styles.image} />
            <CustomText style={styles.mainText} fontWeight="medium">나의 <CustomText style={styles.mainText} fontWeight="bold">티켓스토리</CustomText>가 등록되었어요.</CustomText>
            <CustomText style={styles.subText}>등록한 티켓은 티켓북에서 확인할 수 있어요.</CustomText>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={{...styles.navButton, backgroundColor: '#5D70F9' }} onPress={() => navigation.navigate('MainStack')}>
                    <Image style={styles.homeIcon} source={home} />
                    <CustomText style={{...styles.btnText, color: '#fff'}} fontWeight="medium">홈으로 가기</CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={hi}>
                    <Image style={styles.storyIcon} source={storycard} />
                    <CustomText style={styles.btnText} fontWeight="medium">스토리 카드 보기</CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={openBottomSheet}>
                    <Image style={styles.addticket} source={addticket} />
                    <CustomText style={styles.btnText} fontWeight="medium">티켓 추가 등록하기</CustomText>
                </TouchableOpacity>
            </View>
        </View>

        {bottomSheetVisible && (
            <BottomSheetMenu
            closeBottomSheet={closeBottomSheet}
            onClick={onClick}
            />
        )}
        </>
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
    buttonContainer: {
        marginTop: '20%',
        paddingHorizontal: 40,
        width: '100%',
        gap: 16,
        marginBottom: -100
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
    homeIcon: {
        width: 22,
        height: 22,
        position: 'absolute',
        left: 20,
        top: '50%',
        marginTop: 3,
      },
    storyIcon: {
        width: 50,
        height: 50,
        position: 'absolute',
        left: 5,
        marginTop: 3,
    },
    addticket: {
        width: 50,
        height: 50,
        position: 'absolute',
        left: 6,
        marginTop: 3,
    },
});

export default EnrollFinish;