import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import HomeHeader from '../components/HomeHeader';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
  // Dummy images
  const bannerImages = [
    'https://source.unsplash.com/random/400x150',
    'https://source.unsplash.com/random/401x150',
    'https://source.unsplash.com/random/402x150',
  ];

  const itemImages = [
    'https://source.unsplash.com/random/100x101',
    'https://source.unsplash.com/random/100x102',
    'https://source.unsplash.com/random/100x103',
    'https://source.unsplash.com/random/100x104',
    'https://source.unsplash.com/random/100x105',
    'https://source.unsplash.com/random/100x106',
  ];

  const category = ['영화', '뮤지컬', '연극', '야구'];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HomeHeader />

      <View style={styles.bannerContainer}>
        <Swiper
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={3}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}>
          {bannerImages.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image source={{uri: image}} style={styles.image} />
            </View>
          ))}
        </Swiper>
      </View>

      <View style={styles.categoryContainer}>
        {category.map((item, index) => (
          <View key={index} style={styles.category}>
            <View style={styles.categoryIcon}></View>
            <Text style={styles.categoryLabel}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.sectionText}>티스님을 위한 문화생활 추천</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.itemContainer}>
          {itemImages.map((image, index) => (
            <Image key={index} source={{uri: image}} style={styles.itemImage} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.sectionText}>내 주변 문화생활 추천</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.itemContainer}>
          {itemImages.map((image, index) => (
            <Image key={index} source={{uri: image}} style={styles.itemImage} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  // 상단 배너
  bannerContainer: {
    height: 125,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  // 카테고리
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 25
  },
  category: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
  },
  // 추천 리스트
  sectionText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    gap: 10,
  },
  itemImage: {
    width: 120,
    height: 150,
    resizeMode: 'cover',
  },
});

export default Home;
