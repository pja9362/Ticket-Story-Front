import React, {useEffect} from 'react';
import Header from '../../components/Header';
import { ScrollView, StyleSheet, SafeAreaView, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { CustomText } from '../../components/CustomText';
import {scale, verticalScale, moderateScale} from '../../utils/sizeUtil';
import analytics from '@react-native-firebase/analytics';

import enrollWay1 from '../../images/tutorial/tutorial_1.png';
import enrollWay2 from '../../images/tutorial/tutorial_2.png';
import enrollWay3 from '../../images/tutorial/tutorial_3.png';

import viewWay1 from '../../images/tutorial/tutorial_4.png';
import viewWay2 from '../../images/tutorial/tutorial_5.png';
import viewWay3 from '../../images/tutorial/tutorial_6.png';

const { width } = Dimensions.get('window');

const TutorialHome = ({navigation}) => {

    useEffect(() => {
        analytics().logScreenView({
          screen_name: '이용방법',
          screen_class: 'howtouse'
        })
    }, [])

    const onImagePress = (imageName) => {
        switch(imageName) {
            case 'enrollWay1':
                navigation.navigate('TutorialScrape');
                break;
            case 'enrollWay2':
                navigation.navigate('TutorialEnroll', {type: 'camera'});
                analytics().logScreenView({
                    screen_name: '이용방법 - 카메라 티켓 등록',
                    screen_class: 'howtouse'
                })
                break;
            case 'enrollWay3':
                navigation.navigate('TutorialEnroll', {type: 'hand'});
                analytics().logScreenView({
                    screen_name: '이용방법 - 직접입력 티켓 등록',
                    screen_class: 'howtouse'
                })
                break;
            case 'viewWay1':
                navigation.navigate('TutorialView', {index: 0});
                break;
            case 'viewWay2':
                navigation.navigate('TutorialView', {index: 1});
                break;
            case 'viewWay3':
                navigation.navigate('TutorialView', {index: 2});
                break;
            default:
                break;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{paddingHorizontal: 15}}>
                <Header title="티켓스토리 이용방법" />
            </View>
            {/* 티켓 등록 방법 */}
            <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
                <View style={styles.contentsContainer}>
                    <CustomText style={styles.title} fontWeight="bold">티켓 등록 방법</CustomText>
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
                    <CustomText style={styles.title} fontWeight="bold">등록된 티켓 확인 방법</CustomText>
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
        paddingTop: 5,
        paddingBottom: 15
    },
    contentsContainer: {
        marginTop: 15,
        paddingHorizontal: 15
    },
    title: {
        fontSize: scale(20),
        color: '#525252',
        marginLeft: scale(10),
        marginTop: scale(3),
        marginBottom: verticalScale(8)
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
