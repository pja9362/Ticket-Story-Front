import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const My = () => {
  const navigation = useNavigation();

  const movieScore = 92;
  const theaterScore = 80;
  const musicalScore = 70;
  const sportsScore = 90;

  const getFilledBarStyle = (score) => ({
    height: '100%', 
    width: `${score}%`, 
    backgroundColor: '#5D70F9', 
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12}}>
        <View style={{flex: 1}} />

        <Text style={{color: '#525252', fontWeight: 'bold', fontSize: 17, flex: 1}}>나의 통계</Text>

        <TouchableOpacity style={{width: 64, backgroundColor: '#EEEEEE', borderRadius: 50}} onPress={()=> console.log("공유하기")}>
          <Text style={{color: '#525252',  padding: 7, fontWeight: 700}}>공유하기</Text>
        </TouchableOpacity>
      </View>

      <View style={{alignItems: 'center'}}>
        <Text style={styles.mainText}>
            <Text style={{color: '#5D70F9'}}>아이디</Text>님의 티켓스토리
          </Text>
          {/* 필터 */}
          <View>
            <Text>기간</Text>
        </View>
      </View>
      <View style={styles.mainContent}>

        {/* 관람한 콘텐츠 */}
        <View style={{marginTop: 25, paddingBottom: 32, borderBottomColor: '#0000001A', borderBottomWidth: 1}}>
          <Text style={{...styles.mainText, fontSize: 20, marginBottom: 24}}>관람한 콘텐츠</Text>
          <View style={styles.contentContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.categoryText}>영화 <Text style={{color: '#5D70F9', fontWeight: 700, fontSize: 24}}>   21 </Text>편</Text>
              <Text style={styles.categoryText}>뮤지컬 <Text style={{color: '#5D70F9', fontWeight: 700, fontSize: 24}}>   21 </Text>편</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.categoryText}>연극 <Text style={{color: '#5D70F9', fontWeight: 700, fontSize: 24}}>   21 </Text>편</Text>
              <Text style={styles.categoryText}>스포츠 <Text style={{color: '#5D70F9', fontWeight: 700, fontSize: 24}}>   21 </Text>편</Text>
            </View>
          </View>
        </View>

        {/* 구분선 */}

        {/* 평균 콘텐츠 점수 */}
        <View style={{paddingBottom: 32, borderBottomColor: '#0000001A', borderBottomWidth: 1}}>
          <Text style={{ ...styles.mainText, fontSize: 20, marginTop: 36, marginBottom: 22 }}>평균 콘텐츠 점수</Text>
          <View style={{gap: 10}}>
            <View style={styles.barRow}>
              <Text style={{...styles.categoryText, width: 50, marginRight: 20, textAlign: 'right'}}>영화</Text>
              <View style={styles.bar}>
                <View style={getFilledBarStyle(movieScore)} />
              </View>
              <Text style={styles.scoreText}>{movieScore}</Text>
            </View>
            <View style={styles.barRow}>
              <Text style={{...styles.categoryText, width: 50, marginRight: 20, textAlign: 'right'}}>연극</Text>
              <View style={styles.bar}>
                <View style={getFilledBarStyle(theaterScore)} />
              </View>
              <Text style={styles.scoreText}>{theaterScore}</Text>
            </View>
            <View style={styles.barRow}>
              <Text style={{...styles.categoryText, width: 50, marginRight: 20, textAlign: 'right'}}>뮤지컬</Text>
              <View style={styles.bar}>
                <View style={getFilledBarStyle(musicalScore)} />
              </View>
              <Text style={styles.scoreText}>{musicalScore}</Text>
            </View>
            <View style={styles.barRow}>
              <Text style={{...styles.categoryText, width: 50, marginRight: 20, textAlign: 'right'}}>스포츠</Text>
              <View style={styles.bar}>
                <View style={getFilledBarStyle(sportsScore)} />
              </View>
              <Text style={styles.scoreText}>{sportsScore}</Text>
            </View>
          </View>
        </View>

        {/* 방문한 문화 공간 */}
        <View>
          <Text style={{...styles.mainText, fontSize: 20, marginVertical: 20}}>방문한 문화 공간</Text>
        </View>
      </View>

      {/* dummy */}
      <TouchableOpacity onPress={()=> navigation.navigate('ShowImageView')}>
        <Text>사진 보기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainText: {
    color: '#525252',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mainContent: {
    paddingHorizontal: 20,
  },
  categoryText: {
    color: '#9A9A9A',
    fontWeight: '800',
    fontSize: 16,
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bar: {
    height: 14,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    flex: 1,
  },
  scoreText: {
    color: '#525252',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 14,
  },
});

export default My;