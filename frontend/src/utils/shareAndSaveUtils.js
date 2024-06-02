import { captureRef } from 'react-native-view-shot';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import Share from 'react-native-share';
import { Platform } from 'react-native';

export const handleShareBtn = async (viewRef) => {
    console.log('공유하기');
    try {
        const uri = await captureRef(viewRef, {
            format: 'jpg',
            quality: 0.8,
            result: Platform.OS === 'ios' ? 'tmpfile' : 'base64',
        });

        const shareOptions = {
            title: '공유하기',
            url: Platform.OS === 'ios' ? `file://${uri}` : uri,
        };

        const sharePromise = Share.open(shareOptions);

        if (!sharePromise) {
            console.log('이미지 공유가 취소되었습니다.');
            return;
        }

        await sharePromise.then(() => {
            console.log('이미지가 공유되었습니다.');
        }).catch((error) => {
            console.log('공유 취소', error);
        });

    } catch (error) {
        console.error('이미지 공유 중 오류가 발생했습니다.', error);
    }
};


export const handleSaveBtn = async (viewRef) => {
    console.log('저장하기');
    try {
        const uri = await captureRef(viewRef, {
            format: 'jpg',
            quality: 0.8,
            result: 'tmpfile', 
        });
        await CameraRoll.saveAsset(uri);
        console.log('이미지가 저장되었습니다.');
        return uri;
    } catch (error) {
        console.error('이미지 저장 중 오류가 발생했습니다.', error);
        throw error;
    }
};
