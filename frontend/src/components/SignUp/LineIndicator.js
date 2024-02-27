import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const LineIndicator = ({ step }) => {
  const [animatedWidth] = useState(new Animated.Value(0));
  const totalWidth = Dimensions.get('window').width;

  const calculateWidths = () => {
    const filledWidthPercentage = step * 25;
    const emptyWidthPercentage = 100 - filledWidthPercentage;
    return { filledWidthPercentage, emptyWidthPercentage };
  };
  
  useEffect(() => {
    const { filledWidthPercentage } = calculateWidths();
    const filledWidth = (filledWidthPercentage / 100) * totalWidth; 

    Animated.timing(animatedWidth, {
      toValue: filledWidth,
      duration: 250, 
      useNativeDriver: false, 
    }).start();

  }, [step, animatedWidth]);

  return (
    <View style={styles.divider}>
      <Animated.View style={[styles.filledSegment, { width: animatedWidth } ]} />
      <View style={[styles.emptySegment, { flex: 1 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    flexDirection: 'row',
    height: 4,
    marginHorizontal: -20,
  },
  filledSegment: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  emptySegment: {
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
});

export default LineIndicator;