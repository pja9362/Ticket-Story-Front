import React from 'react';
import Header from '../../components/Header';
import { ScrollView, StyleSheet, SafeAreaView, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { CustomText } from '../../components/CustomText';

import enrollWay1 from '../../images/tutorial/tutorial_1.png';
import enrollWay2 from '../../images/tutorial/tutorial_2.png';
import enrollWay3 from '../../images/tutorial/tutorial_3.png';

import viewWay1 from '../../images/tutorial/tutorial_4.png';
import viewWay2 from '../../images/tutorial/tutorial_5.png';
import viewWay3 from '../../images/tutorial/tutorial_6.png';

const { width } = Dimensions.get('window');

// 함수로 각 이미지 클릭 시 동작 정의
const onImagePress = (imageName) => {
    // 이미지 클릭 시 동작 설정
    console.log(imageName + " 클릭됨");
};

const TutorialHome = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header title="티켓스토리 이용방법" />
            {/* 티켓 등록 방법 */}
            <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
                <View style={styles.contentsContainer}>
                    <CustomText style={styles.title}>티켓 등록 방법</CustomText>
                    {/* 세로로 한 줄 */}
                    <View style={styles.colButtonContainer}>
                        <TouchableOpacity onPress={() => onImagePress('enrollWay1')}>
                            <Image source={enrollWay1} style={styles.colImage} resizeMode="contain" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onImagePress('enrollWay2')}>
                            <Image source={enrollWay2} style={styles.colImage} resizeMode="contain" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onImagePress('enrollWay3')}>
                            <Image source={enrollWay3} style={styles.colImage} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                </View>
                
                {/* 등록된 티켓 확인 방법 */}
                <View style={{...styles.contentsContainer, marginBottom: 20}}>
                    <CustomText style={styles.title}>등록된 티켓 확인 방법</CustomText>
                    {/* 가로로 한 줄 */}
                    <View style={styles.rowButtonContainer}>
                        <TouchableOpacity onPress={() => onImagePress('viewWay1')}>
                            <Image source={viewWay1} style={styles.rowImage} resizeMode="contain" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onImagePress('viewWay2')}>
                            <Image source={viewWay2} style={styles.rowImage} resizeMode="contain" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onImagePress('viewWay3')}>
                            <Image source={viewWay3} style={{...styles.rowImage, marginRight: 0}} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingTop: 5,
        paddingBottom: 15
    },
    contentsContainer: {
        marginTop: 15,
        paddingHorizontal: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#525252'
    },
    colButtonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    rowButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        flex: 3,
        paddingHorizontal: 10
    },
    colImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 323 / 104,
        marginBottom: 10
    },
    rowImage: {
        width: (width - 90) / 3,
        height: undefined,
        aspectRatio: 97 / 192,
        marginRight: 10
    }
});

export default TutorialHome;
