import React from 'react';
import {View, StyleSheet} from 'react-native';

const StepIndicator = ({step}) => {
  return (
    <View style={styles.container}>
      <View style={step >= 1 ? styles.activeStep : styles.inactiveStep} />
      <View style={step >= 2 ? styles.activeStep : styles.inactiveStep} />
      <View style={step >= 3 ? styles.activeStep : styles.inactiveStep} />
      <View style={step >= 4 ? styles.activeStep : styles.inactiveStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 10,
  },
  activeStep: {
    width: 12,
    height: 12,
    borderRadius: 8,
    backgroundColor: '#222222',
  },
  inactiveStep: {
    width: 12,
    height: 12,
    borderRadius: 8,
    backgroundColor: 'lightgray',
  },
});

export default StepIndicator;
