import React, { useState } from 'react';
import Header from '../../components/Header';
import { StyleSheet, SafeAreaView, ScrollView, Dimensions, View, Image, TouchableOpacity } from 'react-native';
import { CustomText } from '../../components/CustomText';

import tutorial_cgv1 from '../../images/tutorial/cgv1.png';
import tutorial_cgv2 from '../../images/tutorial/cgv2.png';
import tutorial_cgv3 from '../../images/tutorial/cgv3.png';
import tutorial_cgv4 from '../../images/tutorial/cgv4.png';
import tutorial_cgv5 from '../../images/tutorial/cgv5.png';

import tutorial_megabox1 from '../../images/tutorial/megabox1.png';
import tutorial_megabox2 from '../../images/tutorial/megabox2.png';
import tutorial_megabox3 from '../../images/tutorial/megabox3.png';
import tutorial_megabox4 from '../../images/tutorial/megabox4.png';
import tutorial_megabox5 from '../../images/tutorial/megabox5.png';

import tutorial_lotte1 from '../../images/tutorial/lotte1.png';
import tutorial_lotte2 from '../../images/tutorial/lotte2.png';
import tutorial_lotte3 from '../../images/tutorial/lotte3.png';
import tutorial_lotte4 from '../../images/tutorial/lotte4.png';

import tutorial_interpark1 from '../../images/tutorial/interpark1.png';
import tutorial_interpark2 from '../../images/tutorial/interpark2.png';
import tutorial_interpark3 from '../../images/tutorial/interpark3.png';
import tutorial_interpark4 from '../../images/tutorial/interpark4.png';

import tutorial_yes1 from '../../images/tutorial/yes1.png';
import tutorial_yes2 from '../../images/tutorial/yes2.png';
import tutorial_yes3 from '../../images/tutorial/yes3.png';
import tutorial_yes4 from '../../images/tutorial/yes4.png';

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
                return (
                    <>
                        <Image source={tutorial_megabox1} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_megabox2} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_megabox3} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_megabox4} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_megabox5} style={{...styles.image, aspectRatio: 0.75}} />
                    </>
                )
            case 2:
                return (
                    <>
                        <Image source={tutorial_lotte1} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_lotte2} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_lotte3} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_lotte4} style={{...styles.image, aspectRatio: 0.75}} />
                    </>
                )
            case 3:
                return (
                    <>
                        <Image source={tutorial_interpark1} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_interpark2} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_interpark3} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_interpark4} style={{...styles.image, aspectRatio: 0.75}} />
                    </>
                )
            case 4:
                return (
                    <>
                        <Image source={tutorial_yes1} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_yes2} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_yes3} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_yes4} style={{...styles.image, aspectRatio: 0.75}} />
                    </>
                )
            default:
                return (
                    <>
                        <Image source={tutorial_cgv1} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_cgv2} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_cgv3} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_cgv4} style={{...styles.image, aspectRatio: 0.75}} />
                        <Image source={tutorial_cgv5} style={{...styles.image, aspectRatio: 0.75}} />
                    </>
                );
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
