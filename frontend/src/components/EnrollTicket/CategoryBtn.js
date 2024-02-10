import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategoryBtn = ({ title, onPress, isSelected, isDisabled }) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryBox,
        { backgroundColor: isSelected ? '#5D70F9' : '#B6B6B6' },
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={styles.categoryText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryBox: {
    backgroundColor: '#B6B6B6',
    borderRadius: 10,
    paddingVertical: 12,
    flex: 1,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CategoryBtn;
