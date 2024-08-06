import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CustomText} from '../CustomText';

const SelectType = ({onClick}) => {
  const [category, setCategory] = useState('');
  const [categoryDetail, setCategoryDetail] = useState('');

  const handleCategoryClick = category => {
    setCategory(category);
    setCategoryDetail('');
  };

  // const handleCategoryDetailClick = categoryDetail => {
  //   setCategoryDetail(categoryDetail);
  //   onClick({category, categoryDetail: categoryDetail});
  // };

  const handleCategoryDetailClick = (selectedCategoryDetail) => {
    let mappedCategory = category;
    let mappedCategoryDetail = selectedCategoryDetail;
  
    if (category === '영화') {
      mappedCategory = 'MOVIE';
      mappedCategoryDetail = selectedCategoryDetail;
    } else if (category === '공연') {
      if (selectedCategoryDetail === '뮤지컬') {
        mappedCategory = 'PERFORMANCE';
        mappedCategoryDetail = 'MUSICAL';
      } else if (selectedCategoryDetail === '연극') {
        mappedCategory = 'PERFORMANCE';
        mappedCategoryDetail = 'PLAY';
      } else {
        mappedCategory = 'PERFORMANCE';
        mappedCategoryDetail = 'PERFORMANCE';
      }
    } else if (category === '스포츠') {
      mappedCategory = 'SPORTS';
      if (selectedCategoryDetail === '야구') {
        mappedCategoryDetail = 'BASEBALL';
      } else if (selectedCategoryDetail === '축구') {
        mappedCategoryDetail = 'SOCCER';
      } else {
        mappedCategoryDetail = 'ETC';
      }
    }
    setCategory(mappedCategory);
    setCategoryDetail(mappedCategoryDetail);
    onClick({ category: mappedCategory, categoryDetail: mappedCategoryDetail });
  };
  
  const renderSubCategories = () => {
    if (category === '영화') {
      return (
        <>
          <CustomText style={[styles.sectionText, {marginTop: 30}]} fontWeight="bold">
            관람한 멀티플렉스를 선택해 주세요.
          </CustomText>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.categoryBox,
                categoryDetail === 'CGV' && styles.category,
              ]}
              onPress={() => handleCategoryDetailClick('CGV')}>
              <CustomText style={styles.categoryText} fontWeight="bold">CGV</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryBox,
                categoryDetail === '메가박스' && styles.category,
              ]}
              onPress={() => handleCategoryDetailClick('메가박스')}>
              <CustomText style={styles.categoryText} fontWeight="bold">메가박스</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryBox,
                categoryDetail === '롯데시네마' && styles.category,
              ]}
              onPress={() => handleCategoryDetailClick('롯데시네마')}>
              <CustomText style={styles.categoryText} fontWeight="bold">롯데시네마</CustomText>
            </TouchableOpacity>
          </View>
        </>
      );
    } else if (category === '스포츠') {
      return (
        <>
          <CustomText style={[styles.sectionText, {marginTop: 30}]} fontWeight="bold">
            관람한 스포츠 종목을 선택해 주세요.
          </CustomText>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.categoryBox,
                categoryDetail === '야구' && styles.selectedCategory,
              ]}
              onPress={() => handleCategoryDetailClick('야구')}>
              <CustomText style={styles.categoryText} fontWeight="bold">야구</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryBox,
                categoryDetail === '축구' && styles.selectedCategory,
              ]}
              onPress={() => handleCategoryDetailClick('축구')}>
              <CustomText style={styles.categoryText} fontWeight="bold">축구</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryBox,
                categoryDetail === '기타' && styles.selectedCategory,
              ]}
              onPress={() => handleCategoryDetailClick('기타')}>
              <CustomText style={styles.categoryText} fontWeight="bold">기타</CustomText>
            </TouchableOpacity>
          </View>
        </>
      );
    } else if (category === '공연') {
      return (
        <>
          <CustomText style={[styles.sectionText, {marginTop: 30}]} fontWeight="bold">
            관람한 공연 종류를 선택해 주세요.
          </CustomText>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.categoryBox,
                categoryDetail === '뮤지컬' && styles.selectedCategory,
              ]}
              onPress={() => handleCategoryDetailClick('뮤지컬')}>
              <CustomText style={styles.categoryText} fontWeight="bold">뮤지컬</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryBox,
                categoryDetail === '연극' && styles.selectedCategory,
              ]}
              onPress={() => handleCategoryDetailClick('연극')}>
              <CustomText style={styles.categoryText} fontWeight="bold">연극</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryBox,
                categoryDetail === '기타' && styles.selectedCategory,
              ]}
              onPress={() => handleCategoryDetailClick('기타')}>
              <CustomText style={styles.categoryText} fontWeight="bold">기타</CustomText>
            </TouchableOpacity>
          </View>
        </>
      );
    }
    return null;
  };
  

  return (
    <View style={styles.container}>
      <CustomText style={styles.sectionText} fontWeight="bold">
        관람한 콘텐츠의 분야를 선택해 주세요.
      </CustomText>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.categoryBox, category === '영화' && styles.category]}
          onPress={() => handleCategoryClick('영화')}>
          <CustomText style={styles.categoryText} fontWeight="bold">영화</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryBox, category === '공연' && styles.category]}
          onPress={() => handleCategoryClick('공연')}>
          <CustomText style={styles.categoryText} fontWeight="bold">공연</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryBox, category === '스포츠' && styles.category]}
          onPress={() => handleCategoryClick('스포츠')}>
          <CustomText style={styles.categoryText} fontWeight="bold">스포츠</CustomText>
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
    paddingVertical: 28,
  },
  sectionText: {
    fontSize: 16,
    color: '#525252',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
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
  category: {
    backgroundColor: '#5D70F9',
  },
});

export default SelectType;
