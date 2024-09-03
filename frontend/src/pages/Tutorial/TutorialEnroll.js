import React from 'react';
import Header from '../../components/Header';
import { StyleSheet, SafeAreaView, Image, ScrollView, Dimensions, View } from 'react-native';
import tutorialOCR from '../../images/tutorial/tutorial_ocr.png';
import tutorialHand from '../../images/tutorial/tutorial_hand.png';

const { width } = Dimensions.get('window');

const TutorialEnroll = ({route}) => {
    const { type } = route.params;
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={{paddingHorizontal: 15}}>
                <Header title="티켓스토리 이용방법" />
            </View>
            <ScrollView >
            {
                type === 'camera' ?
                <Image source={tutorialOCR} style={{...styles.image, aspectRatio: 0.18}} />
                :
                <Image source={tutorialHand} style={{...styles.image, aspectRatio: 0.25}} />
            }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 5,
    },
    image: {
        alignSelf: 'center',
        width: width, 
        height: undefined,
    }
});

export default TutorialEnroll;
