import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const SelectType = ({onClick}) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const handleCategoryClick = category => {
    setSelectedCategory(category);
  };

  const handleSubCategoryClick = subCategory => {
    setSelectedSubCategory(subCategory);
    onClick();
  };

  const renderSubCategories = () => {
    if (selectedCategory === '영화') {
      return (
        <>
          <Text style={[styles.sectionText, {marginTop: 30}]}>
            영화를 관람한 멀티플렉스를 선택해주세요.
          </Text>
          <View style={styles.categoryContainer}>
            <View style={styles.row}>
              <TouchableOpacity
                style={[
                  styles.category,
                  selectedSubCategory === 'CGV' && styles.selectedCategory,
                ]}
                onPress={() => handleSubCategoryClick('CGV')}>
                <Text style={styles.categoryText}>CGV</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.category,
                  selectedSubCategory === '메가박스' && styles.selectedCategory,
                ]}
                onPress={() => handleSubCategoryClick('메가박스')}>
                <Text style={styles.categoryText}>메가박스</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={[
                  styles.category,
                  selectedSubCategory === '롯데시네마' && styles.selectedCategory,
                ]}
                onPress={() => handleSubCategoryClick('롯데시네마')}>
                <Text style={styles.categoryText}>롯데시네마</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.category,
                  selectedSubCategory === '독립영화관' && styles.selectedCategory,
                ]}
                onPress={() => handleSubCategoryClick('독립영화관')}>
                <Text style={styles.categoryText}>독립영화관</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionText}>
        관람한 문화콘텐츠의 종류를 선택 후{'\n'}티켓을 등록해 주세요.
      </Text>
      <View style={styles.categoryContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.category,
              selectedCategory === '영화' && styles.selectedCategory,
            ]}
            onPress={() => handleCategoryClick('영화')}>
            <Text style={styles.categoryText}>영화</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.category,
              selectedCategory === '스포츠' && styles.selectedCategory,
            ]}
            onPress={() => handleCategoryClick('스포츠')}>
            <Text style={styles.categoryText}>스포츠</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.category,
              selectedCategory === '공연' && styles.selectedCategory,
            ]}
            onPress={() => handleCategoryClick('공연')}>
            <Text style={styles.categoryText}>공연</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.category,
              selectedCategory === '전시' && styles.selectedCategory,
            ]}
            onPress={() => handleCategoryClick('전시')}>
            <Text style={styles.categoryText}>전시</Text>
          </TouchableOpacity>
        </View>
      </View>
      {renderSubCategories()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 25,
  },
  categoryContainer: {
    gap: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 25,
  },
  category: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    paddingVertical: 30,
    flex: 1,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  selectedCategory: {
    backgroundColor: '#565656',
  },
});

export default SelectType;
