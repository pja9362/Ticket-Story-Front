import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View, Platform, Alert } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import Share from 'react-native-share';

const dummyImageUrl = 'https://source.unsplash.com/random/400x400';

const ShowImage = () => {
    const viewRef = useRef();

    const handleShareBtn = async () => {
        console.log('공유하기');
        try {
            const uri = await captureRef(viewRef, {
                format: 'jpg',
                quality: 0.8,
                result: Platform.OS === 'ios' ? 'tmpfile' : 'base64',
            });

            const shareOptions = {
                title: '공유하기',
                // url: `data:image/jpeg;base64,${uri}`,
                url: Platform.OS === 'ios' ? `file://${uri}` : uri,
            };
            await Share.open(shareOptions);
            console.log('이미지가 공유되었습니다.');
        } catch (error) {
            console.error('이미지 공유 중 오류가 발생했습니다.', error);
        }
    }

    const handleSaveBtn = async () => {
        console.log('저장하기');
        try {

            const uri = await captureRef(viewRef, {
                format: 'jpg',
                quality: 0.8,
                result: Platform.OS === 'ios' ? 'tmpfile' : 'base64',
            });
            await CameraRoll.saveAsset(uri);
            console.log('이미지가 저장되었습니다.');
            Alert.alert('저장 완료', '이미지가 저장되었습니다.');
        } catch (error) {
            console.error('이미지 저장 중 오류가 발생했습니다.', error);
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <Text>사진 보기</Text>
            <View ref={viewRef} style={styles.imageContainer} collapsable={false}>
                <Image source={{ uri: dummyImageUrl }} style={styles.rawImage}/>
                <View style={styles.overlay}>
                    <Text style={styles.overlayText}>콘텐츠 제목이지롱</Text>
                    <Text style={styles.overlayText}>Date도 적고</Text>
                    <Text style={styles.overlayText}>Time도 적을거야!</Text>
                    <Text style={styles.overlayText}>저장된다고? 짱 신기해</Text>
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
