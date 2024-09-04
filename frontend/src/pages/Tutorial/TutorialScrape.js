import React, { useState } from 'react';
import Header from '../../components/Header';
import { StyleSheet, SafeAreaView, ScrollView, Dimensions, View, Image, TouchableOpacity } from 'react-native';
import { CustomText } from '../../components/CustomText';

import tutorial_cgv1 from '../../images/tutorial/tutorial_cgv1.png';
import tutorial_cgv2 from '../../images/tutorial/tutorial_cgv2.png';
import tutorial_cgv3 from '../../images/tutorial/tutorial_cgv3.png';
import tutorial_cgv4 from '../../images/tutorial/tutorial_cgv4.png';
import tutorial_cgv5 from '../../images/tutorial/tutorial_cgv5.png';

import tutorial_lotte from '../../images/tutorial/tutorial_lottecinema.png';
import tutorial_megabox from '../../images/tutorial/tutorial_megabox.png';
import tutorial_interpark from '../../images/tutorial/tutorial_interpark.png';
import tutorial_yes24 from '../../images/tutorial/tutorial_yes24.png';

const { width } = Dimensions.get('window');

const TutorialScrape = () => {

    const [selectedTab, setSelectedTab] = useState(0);

    const renderContent = () => {
        switch(selectedTab) {
            case 0:
                return (
                    <>
                        <Image source={tutorial_cgv1} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_cgv2} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_cgv3} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_cgv4} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_cgv5} style={{...styles.image, aspectRatio: 0.75}} />
                    </>
                );
            case 1:
                return <Image source={tutorial_megabox} style={{...styles.image, aspectRatio: 0.15}} />;
            case 2:
                return <Image source={tutorial_lotte} style={{...styles.image, aspectRatio: 0.18}} />;
            case 3:
                return <Image source={tutorial_interpark} style={{...styles.image, aspectRatio: 0.18}} />;
            case 4:
                return <Image source={tutorial_yes24} style={{...styles.image, aspectRatio: 0.18}} />;
            default:
                return <Image source={tutorial_cgv} style={{...styles.image, aspectRatio: 0.15}} />;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{paddingHorizontal: 15}}>
                <Header title="티켓스토리 이용방법"/>
            </View>
            <View style={{ paddingTop: 10, paddingBottom: 20, borderBottomColor: '#0000001A', borderBottomWidth: 1 }}>
                <View style={styles.tabsContainer}>
                    {['CGV', '메가박스', '롯데시네마', '인터파크', '예스24'].map((tab, index) => (
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
            <ScrollView >
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

export default TutorialScrape;
