import React from 'react';
import {View, StyleSheet} from 'react-native';

const LineIndicator = ({step}) => {
  const getSegmentStyle = segment => {
    const segmentPercentage = (step > segment ? 100 : (step - 1) * 25) + '%';
    const segmentColor = step > segment ? 'rgba(0, 0, 0, 1)' : 'rgba(217, 217, 217, 1)';

    return {
      width: segmentPercentage,
      backgroundColor: segmentColor,
    };
  };

  return (
    <View style={styles.divider}>
      <View style={[styles.segment, getSegmentStyle(1)]} />
      <View style={[styles.segment, getSegmentStyle(2)]} />
      <View style={[styles.segment, getSegmentStyle(3)]} />
      <View style={[styles.segment, getSegmentStyle(4)]} />
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    flexDirection: 'row',
    height: 4,
    marginHorizontal: -20,
  },
  segment: {
    flex: 1,
  },
});

export default LineIndicator;
