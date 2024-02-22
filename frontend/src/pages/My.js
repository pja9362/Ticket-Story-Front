import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const My = () => {
  
  return (
    <SafeAreaView style={styles.container}>
      <Text>MY PAGE</Text>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default My;