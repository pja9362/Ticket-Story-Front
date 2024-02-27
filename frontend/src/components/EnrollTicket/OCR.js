import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import api from '../../api/api';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const OCR = ({ onNextStep }) => {
  const [scannedImage, setScannedImage] = useState();
  const [openScanner, setOpenScanner] = useState(false);

  useEffect(() => {
    const permissionCheck = async () => {
      if (Platform.OS !== "ios" && Platform.OS !== "android") return;
  
      const platformPermissions =
        Platform.OS === "ios"
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA;
  
      console.log('platformPermissions:', platformPermissions);
  
      const requestCameraPermission = async () => {
        try {
          const result = await request(platformPermissions);
  
          console.log('Permission result:', result); // 추가
  
          result === RESULTS.GRANTED
            ? setOpenScanner(true)
            : Alert.alert("기기 설정으로 이동하여 카메라 권한을 허용해주세요");
        } catch (err) {
          Alert.alert("Camera permission err");
          console.warn(err);
        }
      };
  
      await requestCameraPermission();
    };
  
    permissionCheck();
  }, []);
  

  
  const scanDocument = async () => {
    try {
      const { scannedImages } = await DocumentScanner.scanDocument({
        // responseType: 'base64',
        responseType: 'imageFilePath',
        letUserAdjustCrop: true,
      });

      if (scannedImages.length > 0) {
        setScannedImage(scannedImages[0]);
        onNextStep(); 
      }
    } catch (error) {
      console.error('Error scanning document:', error);
    }
  };

  useEffect(() => {
    if(openScanner)
      scanDocument();
  }, [openScanner]);

  useEffect(() => {
    if (scannedImage) {
      api.saveImageAndPerformOCR(scannedImage);
    }
  }, [scannedImage]);

  return (
    <View style={styles.container}></View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default OCR;