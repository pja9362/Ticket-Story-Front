import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {CustomText} from './CustomText';
import {useNavigation} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';

import loadingIcon1 from '../images/icon_loading1.png';
import loadingIcon2 from '../images/icon_loading2.png';
import loadingIcon3 from '../images/icon_loading3.png';
import loadingIcon4 from '../images/icon_loading4.png';

import closeIcon from '../images/icon_close.png';

const LoadingScreen = ({ iconId, showText = true }) => {
    const navigation = useNavigation();

    const loadingIcons = [loadingIcon1, loadingIcon2, loadingIcon3, loadingIcon4];

    useEffect(() => {
        analytics().logEvent('ticket_camera_ocr');
        analytics().logScreenView({
            screen_name: '카메라 티켓 등록 - OCR 로딩',
            screen_class: 'ticket_register'
        })
    }, []);

    const onCloseGuide = () => {
        navigation.navigate('MainStack');
    }

    return (
      <View style={styles.loadingContainer}>

        {
            showText && (
                <TouchableOpacity
                style={styles.closeButton}
                onPress={onCloseGuide}
                >
                    <Image source={closeIcon} style={styles.closeImg} />
                </TouchableOpacity>
            )
        }

            <Image source={loadingIcons[iconId - 1]} style={styles.loadingIcon} />
            {
                showText && (
                <View style={{height: 120}}>
                    <CustomText style={styles.mainText} fontWeight="bold">열심히 티켓을 읽는 중이에요.</CustomText>
                    <CustomText style={styles.subText}>인터넷 연결 상태에 따라 10초 이상 소요될 수 있어요.</CustomText>
                </View>
                )
            }
      </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 20,
    },
    closeImg: {
        width: 40,
        height: 40,
    },
    closeIcon: {
        width: 20,
        height: 20,
    },
    loadingIcon: {
        width: 72,
        height: 72,
    },
    mainText: {
        fontSize: 16,
        marginTop: 12,
        lineHeight: 40,
        color: '#525252',
        textAlign: 'center',
    },
    subText: {
        fontSize: 12,
        color: '#B6B6B6', 
        textAlign: 'center',
    },
});

export default LoadingScreen;
