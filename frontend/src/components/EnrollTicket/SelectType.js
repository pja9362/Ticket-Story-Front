import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const SelectType = ({onClick}) => {
  const [category, setCategory] = useState('');
  const [categoryDetail, setCategoryDetail] = useState('');

  const handleCategoryClick = category => {
    setCategory(category);
    setCategoryDetail('');
  };

  const handleCategoryDetailClick = categoryDetail => {
    setCategoryDetail(categoryDetail);
    onClick({category, categoryDetail: categoryDetail});
  };

  const renderSubCategories = () => {
    if (category === '영화') {
      return (
        <>
          <Text style={[styles.sectionText, {marginTop: 30}]}>
            영화를 관람한 멀티플렉스를 선택해주세요.
          </Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.categoryBox,
                categoryDetail === 'CGV' && styles.category,
              ]}
              onPress={() => handleCategoryDetailClick('CGV')}>
              <Text style={styles.categoryText}>CGV</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryBox,
                categoryDetail === '메가박스' && styles.category,
              ]}
              onPress={() => handleCategoryDetailClick('메가박스')}>
              <Text style={styles.categoryText}>메가박스</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryBox,
                categoryDetail === '롯데시네마' && styles.category,
              ]}
              onPress={() => handleCategoryDetailClick('롯데시네마')}>
              <Text style={styles.categoryText}>롯데시네마</Text>
            </TouchableOpacity>
          </View>
        </>
      );
    } else if (category === '스포츠') {
      return (
        <>
          <Text style={[styles.sectionText, {marginTop: 30}]}>
            스포츠 카테고리 디테일을 선택해주세요.
          </Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.categoryBox,
                categoryDetail === '축구' && styles.selectedCategory,
              ]}
              onPress={() => handleCategoryDetailClick('축구')}>
              <Text style={styles.categoryText}>축구</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryBox,
                categoryDetail === '야구' && styles.selectedCategory,
              ]}
              onPress={() => handleCategoryDetailClick('야구')}>
              <Text style={styles.categoryText}>야구</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryBox,
                categoryDetail === '기타' && styles.selectedCategory,
              ]}
              onPress={() => handleCategoryDetailClick('기타')}>
              <Text style={styles.categoryText}>기타</Text>
            </TouchableOpacity>
          </View>
        </>
      );
    } else if (category === '공연') {
      return (
        <>
          <Text style={[styles.sectionText, {marginTop: 30}]}>
            공연 카테고리 디테일을 선택해주세요.
          </Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.categoryBox,
                categoryDetail === '뮤지컬' && styles.selectedCategory,
              ]}
              onPress={() => handleCategoryDetailClick('뮤지컬')}>
              <Text style={styles.categoryText}>뮤지컬</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryBox,
                categoryDetail === '연극' && styles.selectedCategory,
              ]}
              onPress={() => handleCategoryDetailClick('연극')}>
              <Text style={styles.categoryText}>연극</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryBox,
                categoryDetail === '기타' && styles.selectedCategory,
              ]}
              onPress={() => handleCategoryDetailClick('기타')}>
              <Text style={styles.categoryText}>기타</Text>
            </TouchableOpacity>
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
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.categoryBox, category === '영화' && styles.category]}
          onPress={() => handleCategoryClick('영화')}>
          <Text style={styles.categoryText}>영화</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryBox, category === '스포츠' && styles.category]}
          onPress={() => handleCategoryClick('스포츠')}>
          <Text style={styles.categoryText}>스포츠</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryBox, category === '공연' && styles.category]}
          onPress={() => handleCategoryClick('공연')}>
          <Text style={styles.categoryText}>공연</Text>
        </TouchableOpacity>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 25,
  },
  categoryBox: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    paddingVertical: 15,
    flex: 1,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  category: {
    backgroundColor: '#565656',
  },
});

export default SelectType;
