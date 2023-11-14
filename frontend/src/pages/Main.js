import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';

const Main = () => {
  const [scannedImage, setScannedImage] = useState();

  const scanDocument = async () => {
    // start the document scanner
    const {scannedImages} = await DocumentScanner.scanDocument();

    // get back an array with scanned image file paths
    if (scannedImages.length > 0) {
      // set the img src, so we can view the first scanned image
      setScannedImage(scannedImages[0]);
    }
  };

  useEffect(() => {
    // call scanDocument on load
    scanDocument();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Main</Text>
      <TouchableOpacity onPress={scanDocument}>
        <Text>Scan Document</Text>
      </TouchableOpacity>
      {scannedImage && (
        <Image
          resizeMode="contain"
          style={{width: '100%', height: 300}}
          source={{uri: scannedImage}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default Main;
