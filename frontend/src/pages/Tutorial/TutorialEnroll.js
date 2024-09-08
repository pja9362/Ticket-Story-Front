import React from 'react';
import Header from '../../components/Header';
import { StyleSheet, SafeAreaView, Image, ScrollView, Dimensions, View } from 'react-native';

import tutorialOCR1 from '../../images/tutorial/camera1.png';
import tutorialOCR2 from '../../images/tutorial/camera2.png';
import tutorialOCR3 from '../../images/tutorial/camera3.png';
import tutorialOCR4 from '../../images/tutorial/camera4.png';

import tutorialHand1 from '../../images/tutorial/hand1.png';
import tutorialHand2 from '../../images/tutorial/hand2.png';
import tutorialHand3 from '../../images/tutorial/hand3.png';

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
                    <>
                        <Image source={tutorialOCR1} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorialOCR2} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorialOCR3} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorialOCR4} style={{...styles.image, aspectRatio: 0.75}} />
                    </>
                :
                    <>
                        <Image source={tutorialHand1} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorialHand2} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorialHand3} style={{...styles.image, aspectRatio: 0.75}} />
                    </>
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
