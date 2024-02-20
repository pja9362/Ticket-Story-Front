import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import api from '../../api/api';

const OCR = ({ onNextStep }) => {
  const [scannedImage, setScannedImage] = useState();

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
    scanDocument();
  }, []);

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