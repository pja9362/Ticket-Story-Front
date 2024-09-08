import React, { useState } from 'react';
import Header from '../../components/Header';
import { StyleSheet, SafeAreaView, ScrollView, Dimensions, View, Image, TouchableOpacity } from 'react-native';
import { CustomText } from '../../components/CustomText';
import ticketcard1 from '../../images/tutorial/ticketcard1.png';
import ticketcard2 from '../../images/tutorial/ticketcard2.png';
import ticketcard3 from '../../images/tutorial/ticketcard3.png';

import storycard1 from '../../images/tutorial/storycard1.png';
import storycard2 from '../../images/tutorial/storycard2.png';
import storycard3 from '../../images/tutorial/storycard3.png';

import detail1 from '../../images/tutorial/detail1.png';
import detail2 from '../../images/tutorial/detail2.png';

const { width } = Dimensions.get('window');

const TutorialView = ({route}) => {
    const { index } = route.params;

    const [selectedTab, setSelectedTab] = useState(index ? index : 0);

    const renderContent = () => {
        switch(selectedTab) {
            case 0:
                return (
                    <>
                        <Image source={ticketcard1} style={{...styles.image, aspectRatio: 0.85}} />
                        <Image source={ticketcard2} style={{...styles.image, aspectRatio: 0.85}} />
                        <Image source={ticketcard3} style={{...styles.image, aspectRatio: 0.85}} />
                    </>
                )
            case 1:
                return (
                    <>
                        <Image source={storycard1} style={{...styles.image, aspectRatio: 0.6}} />
                        <Image source={storycard2} style={{...styles.image, aspectRatio: 0.6}} />
                        <Image source={storycard3} style={{...styles.image, aspectRatio: 0.6}} />
                    </>
                )
            case 2:
                return (
                    <>
                        <Image source={detail1} style={{...styles.image, aspectRatio: 0.85}} />
                        <Image source={detail2} style={{...styles.image, aspectRatio: 0.85}} />
                    </>
                )
            default:
                return (
                    <>
                        <Image source={ticketcard1} style={{...styles.image, aspectRatio: 0.85}} />
                        <Image source={ticketcard2} style={{...styles.image, aspectRatio: 0.85}} />
                        <Image source={ticketcard3} style={{...styles.image, aspectRatio: 0.85}} />
                    </>
                )
        }
    }

    
    return (
        <SafeAreaView style={styles.container}>
            <View style={{paddingHorizontal: 15}}>
                <Header title="티켓스토리 이용방법"/>
            </View>
            <View style={{ paddingTop: 10, paddingBottom: 20, borderBottomColor: '#0000001A', borderBottomWidth: 1 }}>
                <View style={styles.tabsContainer}>
                    {['티켓카드', '스토리카드', '세부정보'].map((tab, index) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setSelectedTab(index)}
                        >
                            <CustomText style={{textAlign: 'center', color: selectedTab === index ? '#525252' : '#D9D9D9', fontSize: 15, paddingTop: 8}} fontWeight="bold">{tab}</CustomText>
                            {selectedTab === index && (
                                <View style={styles.activeTabBorder} />
                            )}  
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <ScrollView>
                {renderContent()}
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
    },
    tabsContainer: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    activeTabBorder: {
        position: 'absolute',
        bottom: -22, 
        height: 3,
        backgroundColor: '#525252',
        width: '100%',
        borderRadius: 3,
    },
});

export default TutorialView;
