import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { handleShareBtn } from '../../utils/shareAndSaveUtils';
import { loadMyStatistics } from '../../actions/statistics/statistics';
import LoadingScreen from '../../components/LoadingScreen';
import { CustomText } from '../../components/CustomText';

const My = () => {
  const dispatch = useDispatch();
  const viewRef = useRef();

  const auth = useSelector((state) => state.auth.isAuthenticated);
  const myStatistics = useSelector((state) => state.statistics.myStatistics);

  const [movieStats, setMovieStats] = useState(null);
  const [playStats, setPlayStats] = useState(null);
  const [musicalStats, setMusicalStats] = useState(null);
  const [sportsStats, setSportsStats] = useState(null);
  const [locationCountStats, setLocationCountStats] = useState(null);
  const [locationListStats, setLocationListStats] = useState([]);

  const getFilledBarStyle = (score) => ({
    height: '100%', 
    width: `${score}%`, 
    backgroundColor: '#5D70F9', 
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  });

  const handleShareBtnPress = () => {
    handleShareBtn(viewRef);
  };

  useFocusEffect(
    useCallback(() => {
      if (auth) {
        dispatch(loadMyStatistics())
          .then((data) => {
            console.log('My Statistics', data);
            setMovieStats(data.movieStatistics);
            setPlayStats(data.playStatistics);
            setMusicalStats(data.musicalStatistics);
            setSportsStats(data.sportsStatistics);
            setLocationCountStats(data.locationTypeCount);
            setLocationListStats(data.locationCount);
          });
      }
    }, [auth, dispatch])
  );

  const isLoaded = movieStats && playStats && musicalStats && sportsStats && locationCountStats && locationListStats;

  const [loadingIcon, setLoadingIcon] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingIcon((prevIcon) => (prevIcon % 4) + 1);
    }, 200);

    return () => clearInterval(intervalId);
  }, []);

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
        (myStatistics == null || !isLoaded) ? <LoadingScreen iconId={loadingIcon} showText={false} /> :
          <ScrollView>
            <View
              collapsable={false}
              ref={viewRef}
            >
              {/* <View style={{ alignItems: 'center' }}>
                <CustomText style={{...styles.mainText, marginTop: 30}}>
                  <CustomText style={{ color: '#5D70F9' }}>아이디</CustomText>님의 티켓스토리
                </CustomText>
              </View> */}
              <View style={styles.mainContent}>
                {/* 관람한 콘텐츠 */}
                <View style={{ marginTop: 25, paddingBottom: 32, borderBottomColor: '#0000001A', borderBottomWidth: 1 }}>
                  <CustomText style={{ ...styles.mainText, fontSize: 20, marginBottom: 24 }} fontWeight="bold">관람한 콘텐츠</CustomText>
                  <View style={styles.contentContainer}>
                    <View style={styles.rowContainer}>
                      <CustomText style={styles.categoryText} fontWeight="bold">영화 <CustomText style={{ color: '#5D70F9', fontSize: 24 }} fontWeight="bold">   {movieStats && movieStats.viewCount} </CustomText>편</CustomText>
                      <CustomText style={styles.categoryText} fontWeight="bold">뮤지컬 <CustomText style={{ color: '#5D70F9', fontSize: 24 }} fontWeight="bold">   {musicalStats && musicalStats.viewCount} </CustomText>편</CustomText>
                    </View>
                    <View style={styles.rowContainer}>
                      <CustomText style={styles.categoryText} fontWeight="bold">연극 <CustomText style={{ color: '#5D70F9', fontSize: 24 }} fontWeight="bold">   {playStats && playStats.viewCount} </CustomText>편</CustomText>
                      <CustomText style={styles.categoryText} fontWeight="bold">스포츠 <CustomText style={{ color: '#5D70F9', fontSize: 24 }} fontWeight="bold">   {sportsStats && sportsStats.viewCount} </CustomText>편</CustomText>
                    </View>
                  </View>
                </View>

                {/* 평균 콘텐츠 점수 */}
                <View style={{ paddingBottom: 32, borderBottomColor: '#0000001A', borderBottomWidth: 1 }}>
                  <CustomText style={{ ...styles.mainText, fontSize: 20, marginTop: 36, marginBottom: 22 }} fontWeight="bold">평균 콘텐츠 점수</CustomText>
                  <View style={{ gap: 10 }}>
                    <View style={styles.barRow}>
                      <CustomText style={{ ...styles.categoryText, width: 50, marginRight: 20, textAlign: 'right' }} fontWeight="bold">영화</CustomText>
                      <View style={styles.bar}>
                        <View style={getFilledBarStyle(movieStats.averageScore)} />
                      </View>
                      <CustomText style={styles.scoreText} fontWeight="bold">{movieStats.viewCount != 0 ? movieStats.averageScore : ""}</CustomText>
                    </View>
                    <View style={styles.barRow}>
                      <CustomText style={{ ...styles.categoryText, width: 50, marginRight: 20, textAlign: 'right' }} fontWeight="bold">연극</CustomText>
                      <View style={styles.bar}>
                        <View style={getFilledBarStyle(playStats.averageScore)} />
                      </View>
                      <CustomText style={styles.scoreText} fontWeight="bold">{playStats.viewCount != 0 ? playStats.averageScore : ""}</CustomText>
                    </View>
                    <View style={styles.barRow}>
                      <CustomText style={{ ...styles.categoryText, width: 50, marginRight: 20, textAlign: 'right' }} fontWeight="bold">뮤지컬</CustomText>
                      <View style={styles.bar}>
                        <View style={getFilledBarStyle(musicalStats.averageScore)} />
                      </View>
                      <CustomText style={styles.scoreText} fontWeight="bold">{musicalStats.viewCount != 0 ? musicalStats.averageScore : ""}</CustomText>
                    </View>
                    <View style={styles.barRow}>
                      <CustomText style={{ ...styles.categoryText, width: 50, marginRight: 20, textAlign: 'right' }} fontWeight="bold">스포츠</CustomText>
                      <View style={styles.bar}>
                        <View style={getFilledBarStyle(sportsStats.averageScore)} />
                      </View>
                      <CustomText style={styles.scoreText} fontWeight="bold">{sportsStats.viewCount != 0 ? sportsStats.averageScore : ""}</CustomText>
                    </View>
                  </View>
                </View>

                {/* 방문한 문화 공간 */}
                <View>
                  <CustomText style={{ ...styles.mainText, fontSize: 20, marginVertical: 20 }} fontWeight="bold">방문한 문화 공간</CustomText>
                  <View style={styles.locationContainer}>
                    <CustomText style={styles.locationText} fontWeight="bold">영화관 <CustomText style={{ color: '#5D70F9', fontSize: 22 }} fontWeight="bold"> {locationCountStats.movieLocationCount} </CustomText>곳</CustomText>
                    <CustomText style={styles.locationText} fontWeight="bold">공연장 <CustomText style={{ color: '#5D70F9', fontSize: 22 }} fontWeight="bold"> {locationCountStats.performanceLocationCount} </CustomText>곳</CustomText>
                    <CustomText style={styles.locationText} fontWeight="bold">경기장 <CustomText style={{ color: '#5D70F9', fontSize: 22 }} fontWeight="bold"> {locationCountStats.sportsLocationCount} </CustomText>곳</CustomText>
                  </View>

                  {/* locationCount  분류, 장소명, 방문횟수 */}
                  <View>
                    <View style={styles.tableHeader}>
                      <CustomText style={styles.columnHeader} fontWeight="bold">분류</CustomText>
                      <CustomText style={styles.columnHeader} fontWeight="bold">장소명</CustomText>
                      <CustomText style={styles.columnHeader} fontWeight="bold">방문횟수</CustomText>
                    </View>
                    {locationListStats.slice(0, 10).map((location, index) => (
                      <View key={index} style={styles.tableRow}>
                        <CustomText style={styles.tableCell} fontWeight="medium">{location.locationType}</CustomText>
                        <CustomText style={styles.tableCell} fontWeight="medium">{location.locationName}</CustomText>
                        <CustomText style={styles.tableCell} fontWeight="medium">{location.count}</CustomText>
                      </View>
                    ))}
                    <View style={{ alignItems: 'center', paddingVertical: 10, marginBottom: 30, borderBottomColor: '#0000001A', borderBottomWidth: 1 }}>
                      <CustomText style={{ color: '#D9D9D9', fontSize: 14 }}>방문한 문화 공간은 상위 10곳만 나타납니다.</CustomText>
                    </View>
                  </View>
                </View>
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
    fontSize: 24,
    marginBottom: 10,
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  locationContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  locationText: {
    color: '#9A9A9A',
    fontSize: 14,
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
    fontSize: 20,
    marginLeft: 14,
    width: 40,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 5,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  columnHeader: {
    flex: 1,
    color: '#9A9A9A',
    textAlign: 'center',
    paddingVertical: 5,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  tableCell: {
    flex: 1,
    color: '#9A9A9A',
    textAlign: 'center',
  },
});

export default My;
