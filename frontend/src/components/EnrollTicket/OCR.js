import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';

const OCR = ({onNextStep}) => {
  const [scannedImage, setScannedImage] = useState();

  const scanDocument = async () => {
    const {scannedImages} = await DocumentScanner.scanDocument();

    if (scannedImages.length > 0) {
      setScannedImage(scannedImages[0]);
    }
  };

  useEffect(() => {
    scanDocument();
  }, []);

  return (
    <View style={styles.container}>
      {scannedImage && (
        <>
        <Image
          resizeMode="contain"
          style={{width: '100%', height: 300}}
          source={{uri: scannedImage}}
        />

        <TouchableOpacity onPress={onNextStep}>
          <Text>다음</Text>
        </TouchableOpacity>
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
