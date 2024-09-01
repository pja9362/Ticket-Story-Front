import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CustomText } from '../../components/CustomText';

const CategoryBtn = ({ title, onPress, isSelected, isDisabled, makeSmall }) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryBox,
        { backgroundColor: isSelected ? '#5D70F9' : '#B6B6B6' },
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <CustomText
        style={[ styles.categoryText, { fontSize: makeSmall ? 13 : 16 } ]}
        fontWeight="bold"
      >
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryBox: {
    backgroundColor: '#B6B6B6',
    borderRadius: 12,
    paddingVertical: 12,
    flex: 1,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default CategoryBtn;
