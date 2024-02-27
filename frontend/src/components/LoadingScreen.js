import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

import loadingIcon1 from '../images/icon_loading1.png';
import loadingIcon2 from '../images/icon_loading2.png';
import loadingIcon3 from '../images/icon_loading3.png';
import loadingIcon4 from '../images/icon_loading4.png';

const LoadingScreen = ({ iconId }) => {
    useEffect(() => {
        console.log('LoadingScreen rendered');
    }, []);

    const loadingIcons = [loadingIcon1, loadingIcon2, loadingIcon3, loadingIcon4];

    return (
      <View style={styles.loadingContainer}>
            <Image source={loadingIcons[iconId - 1]} style={styles.loadingIcon} />
            <View style={{height: 120}}>
                <Text style={styles.mainText} >열심히 티켓을 읽는 중이에요.</Text>
                <Text style={styles.subText}>인터넷 연결 상태에 따라 10초 이상 소요될 수 있어요.</Text>
            </View>
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
    loadingIcon: {
        width: 72,
        height: 72,
    },
    mainText: {
        fontSize: 16,
        fontWeight: 'bold',
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
