import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { handleShareBtn } from '../../utils/shareAndSaveUtils';
import { CustomText } from '../../components/CustomText';
import Total from '../../components/Statistic/Total';
import Movie from '../../components/Statistic/Movie';
import Performance from '../../components/Statistic/Performance';
import Sports from '../../components/Statistic/Sports';
import { loadMyStatistics } from '../../actions/statistics/statistics';

const Stats = () => {
  const viewRef = useRef();
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState('전체');

  useEffect(() => {
    dispatch(loadMyStatistics())
      .then((response) => {
        console.log('response:', response);
      })
  }, []);

  const dummyData = {
    totalStats: {
      viewCount: 63,
      averageScore: 92,
    },
    movieStats: {
      viewCount: 21,
      averageScore: 92,
    },
    performanceStats: {
      viewCount: 21,
      averageScore: 82,
    },
    sportsStats: {
      viewCount: 21,
      averageScore: 82,
    },
    locationCountStats: {
      movieLocationCount: 121,
      performanceLocationCount: 121,
      sportsLocationCount: 121,
    },
    locationListStats: [
      { locationType: '영화관', locationName: 'CGV 강남', count: 12 },
      { locationType: '영화관', locationName: 'CGV 홍대', count: 10 },
      { locationType: '영화관', locationName: 'CGV 신촌', count: 8 },
      { locationType: '영화관', locationName: 'CGV 강북', count: 7 },
      { locationType: '영화관', locationName: 'CGV 강남', count: 6 },
      { locationType: '영화관', locationName: 'CGV 홍대', count: 5 },
      { locationType: '영화관', locationName: 'CGV 신촌', count: 4 },
      { locationType: '영화관', locationName: 'CGV 강북', count: 3 },
      { locationType: '영화관', locationName: 'CGV 강남', count: 2 },
      { locationType: '영화관', locationName: 'CGV 홍대', count: 1 },
    ],
  };

  const dummyMovieData = {
    "cgvViewCount": 7,
    "lottecinemaViewCount": 7,
    "megaboxViewCount": 7,
    "indieViewCount": 7,
    "multiplexAverageScore": 92,
    "indieAverageScore": 92,
    "movieLocationCount": 121,
    "locationCount": [
      {
        "locationType": "영화관",
        "locationName": "CGV 강남",
        "count": 12,
      },
      {
        "locationType": "영화관",
        "locationName": "CGV 홍대",
        "count": 10,
      },
    ]
  }

  const dummyPerformanceData = {
    "musicalViewCount": 7,
    "dramaViewCount": 7,
    "otherViewCount": 7,
    "musicalAverageScore": 92,
    "dramaAverageScore": 82,
    "otherAverageScore": 82,
    "playLocationCount": 121,
    "locationCount": [
      {
        "locationType": "공연장",
        "locationName": "예술의 전당",
        "count": 12,
      },
      {
        "locationType": "공연장",
        "locationName": "세종문화회관",
        "count": 10,
      },  
    ]
  }

  const dummySportsData = {
    "baseballViewCount": 7,
    "soccerViewCount": 7,
    "otherViewCount": 7,
    "baseballAverageScore": 92,
    "soccerAverageScore": 82,
    "otherAverageScore": 82,
    "sportsLocationCount": 121,
    "locationCount": [
      {
        "locationType": "경기장",
        "locationName": "잠실야구장",
        "count": 12,
      },
      {
        "locationType": "경기장",
        "locationName": "상암야구장",
        "count": 10,
      },
      {
        "locationType": "경기장",
        "locationName": "대전한화생명이글스파크",
        "count": 12,
      }
    ]
  }

  const handleShareBtnPress = () => {
    handleShareBtn(viewRef);
  };

  // 선택된 탭에 따라 다른 콘텐츠를 렌더링
  const renderContent = () => {
    switch (selectedTab) {
      case '영화':
        return (
          <Movie dummyData={dummyMovieData} />
        );
      case '공연':
        return (
          <Performance dummyData={dummyPerformanceData} />
        );
      case '스포츠':
        return (
          <Sports dummyData={dummySportsData} />
        );
      default:
        return (
          <Total dummyData={dummyData} />
        );
    }
  };

  const convertTabToViewCount = (tab) => {
    switch (tab) {
      case '전체':
        return dummyData.totalStats.viewCount;
      case '영화':
        return dummyData.movieStats.viewCount;
      case '공연':
        return dummyData.performanceStats.viewCount;
      case '스포츠':
        return dummyData.sportsStats.viewCount;
      default:
        return 0;
    }
  }

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12 }}>
        <View style={{ flex: 1 }} />

        <CustomText style={{ color: '#525252', fontSize: 17, flex: 1 }} fontWeight="bold">나의 통계</CustomText>

        <TouchableOpacity style={{ width: 64, backgroundColor: '#EEEEEE', borderRadius: 50 }} onPress={handleShareBtnPress}>
          <CustomText style={{ color: '#525252', padding: 7 }} fontWeight="bold">공유하기</CustomText>
        </TouchableOpacity>
      </View>

      {
          <ScrollView>
            <View
              collapsable={false}
              ref={viewRef}
            >
              <View style={styles.mainContent}>
                {/* 분야별 관람 횟수 */}
                <View style={{ paddingBottom: 20, borderBottomColor: '#0000001A', borderBottomWidth: 1 }}>
                  <CustomText style={{ ...styles.mainText, marginBottom: 20 }} fontWeight="bold">분야별 관람 횟수</CustomText>
                  <View style={styles.tabsContainer}>
                    {/* 4가지 탭으로 화면 구성 */}
                    {/* 1) 전체, 2) 영화, 3) 공연, 4) 스포츠 */}
                    {['전체', '영화', '공연', '스포츠'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setSelectedTab(tab)}
                      >
                        <CustomText style={{textAlign: 'center', color: '#5D70F9', fontSize: 20}} fontWeight="bold">{convertTabToViewCount(tab)}</CustomText>
                        <CustomText style={{textAlign: 'center', color: selectedTab === tab ? '#525252' : '#D9D9D9', fontSize: 15, paddingTop: 8}} fontWeight="bold">{tab}</CustomText>
                        {selectedTab === tab && (
                            <View style={styles.activeTabBorder} />
                        )}  
                    </TouchableOpacity>
                    ))}
                  </View>
                </View>
                {renderContent()}
              </View>
            </View>
          </ScrollView>
      }
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
    fontSize: 19,
  },
  mainContent: {
    paddingHorizontal: 20,
    marginTop: 5,
  },
  categoryText: {
    color: '#9A9A9A',
    fontSize: 16,
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  activeTabBorder: {
    position: 'absolute',
    bottom: -22, 
    height: 3,
    backgroundColor: '#525252',
    width: '100%',
    borderRadius: 3,
  },
});

export default  Stats;
