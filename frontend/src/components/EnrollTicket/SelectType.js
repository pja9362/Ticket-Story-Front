import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const SelectType = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionText}>
        관람한 문화콘텐츠의 종류를 선택 후{'\n'}티켓을 등록해 주세요.
      </Text>
      <View style={styles.categoryContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.category}><Text style={styles.categoryText}>영화</Text></TouchableOpacity>
          <TouchableOpacity style={styles.category}><Text style={styles.categoryText}>스포츠</Text></TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.category}><Text style={styles.categoryText}>공연</Text></TouchableOpacity>
          <TouchableOpacity style={styles.category}><Text style={styles.categoryText}>전시</Text></TouchableOpacity>
        </View>
      </View>
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
  }
});

export default SelectType;
