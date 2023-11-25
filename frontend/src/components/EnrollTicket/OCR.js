import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import RNFS from 'react-native-fs';
import axios from 'axios';

const OCR = ({ onNextStep }) => {
  const [scannedImage, setScannedImage] = useState();

  const scanDocument = async () => {
    try {
      const { scannedImages } = await DocumentScanner.scanDocument({
        maxNumDocuments: 1,
        responseType: 'base64',
      });

      if (scannedImages.length > 0) {
        setScannedImage(scannedImages[0]);
      }
    } catch (error) {
      console.error('Error scanning document:', error);
    }
  };

  useEffect(() => {
    const saveImageToFile = async () => {
      if (scannedImage) {
        try {
          const path = `${RNFS.CachesDirectoryPath}/scannedImage.jpg`;

          // Decode base64 and save as a file
          await RNFS.writeFile(path, scannedImage, 'base64');
          
          console.log('Image saved to:', path);

          const formData = new FormData();
          formData.append('img', {
            uri: `file://${path}`,
            name: 'scannedImage.jpg',
            type: 'image/jpeg',
          });

          const response = await axios.post('http://192.168.0.98:8080/ocr/ocr-api', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          console.log('OCR response:', response.data);

        } catch (error) {
          console.error('Error saving image to file:', error);
        }
      }
    };

    saveImageToFile();
  }, [scannedImage]);

  useEffect(() => {
    scanDocument();
  }, []);

  return (
    <View style={styles.container}>
      {scannedImage && (
        <>
          <Image
            resizeMode="contain"
            style={{ width: '100%', height: 300 }}
            source={{ uri: `data:image/jpeg;base64,${scannedImage}` }}
          />
{/* 
          <TouchableOpacity onPress={onNextStep}>
            <Text>다음</Text>
          </TouchableOpacity> */}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OCR;
