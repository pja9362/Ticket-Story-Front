import React from 'react';
import { View } from 'react-native';
import CategoryBtn from './CategoryBtn'; 

const CategoryBtnContainer = ({ categories, selectedCategory, onSelectCategory, showPerformanceButton }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 20, gap: 25}}>
      {categories.map((category) => (
        <CategoryBtn
          key={category}
          title={category}
          onPress={() => onSelectCategory(category)}
          isSelected={selectedCategory === category}
        />
      ))}
    </View>
  );
};

export default CategoryBtnContainer;
