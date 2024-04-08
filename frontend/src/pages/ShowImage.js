import React from 'react';
import { SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';

const dummyImageUrl = 'https://source.unsplash.com/random/400x400';

const ShowImage = () => {
    const handleShareBtn = () => {
        console.log('공유하기')
    }

    const handleSaveBtn = () => {
        console.log('저장하기')
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <Text>사진 보기</Text>
            <View style={styles.imageContainer}>
                <Image source={{ uri: dummyImageUrl }} style={styles.rawImage} />
                <View style={styles.overlay}>
                    <Text style={styles.overlayText}>콘텐츠 제목이지롱</Text>
                    <Text style={styles.overlayText}>Date도 적고</Text>
                    <Text style={styles.overlayText}>Time도 적을거야!</Text>
                </View>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={handleShareBtn}>
                    <Text>공유하기</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveBtn}>
                    <Text>저장하기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    imageContainer: {
        position: 'relative',
        width: 356,
        height: 356,
    },
    rawImage: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
    },
    overlayText: {
        color: '#fff',
        fontSize: 16,
    },
    btnContainer: {
        flexDirection: 'row',
        padding: 10,
        gap: 20
    }
});

export default ShowImage;
