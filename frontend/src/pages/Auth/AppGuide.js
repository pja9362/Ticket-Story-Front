import React from "react";
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import guideImg from '../../images/app_guide.png';

const AppGuide = () => {
    const navigation = useNavigation(); // 네비게이션 훅 사용

    // 화면 아무곳이나 클릭하면 Main으로 이동
    const handlePress = () => {
        navigation.navigate('MainStackWithDrawer');
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container}>
                <Image source={guideImg} style={styles.image} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00000080',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default AppGuide;
