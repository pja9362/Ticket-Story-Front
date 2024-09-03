import React, { useState } from 'react';
import Header from '../../components/Header';
import { StyleSheet, SafeAreaView, ScrollView, Dimensions, View, Image, TouchableOpacity } from 'react-native';
import { CustomText } from '../../components/CustomText';
import tutorial_view1 from '../../images/tutorial/tutorial_view1.png';
import tutorial_view2 from '../../images/tutorial/tutorial_view2.png';
import tutorial_view3 from '../../images/tutorial/tutorial_view3.png';

const { width } = Dimensions.get('window');

const TutorialView = () => {
    
    const [selectedTab, setSelectedTab] = useState(0);

    const renderContent = () => {
        switch(selectedTab) {
            case 0:
                return <Image source={tutorial_view1} style={{...styles.image, aspectRatio: 0.3}} />;
            case 1:
                return <Image source={tutorial_view2} style={{...styles.image, aspectRatio: 0.24}} />;
            case 2:
                return <Image source={tutorial_view3} style={{...styles.image, aspectRatio: 0.4}} />;
            default:
                return <Image source={tutorial_view1} style={{...styles.image, aspectRatio: 0.15}} />;
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
