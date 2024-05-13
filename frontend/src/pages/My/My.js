import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import { handleShareBtn } from '../../utils/shareAndSaveUtils';
import { loadMyStatistics } from '../../actions/statistics/statistics';
import LoadingScreen from '../../components/LoadingScreen';

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
  });

  const handleShareBtnPress = () => {
    handleShareBtn(viewRef);
  }

  useEffect(() => {
    if (auth) {
      dispatch(loadMyStatistics())
        .then((data) => {
          console.log('My Statistics', data);
          console.log('Movie Stats', data.movieStatistics);
          setMovieStats(data.movieStatistics);
          setPlayStats(data.playStatistics);
          setMusicalStats(data.musicalStatistics);
          setSportsStats(data.sportsStatistics);
          setLocationCountStats(data.locationTypeCount);
          setLocationListStats(data.locationCount);
        });
    }
  }, []);

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
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12}}>
        <View style={{flex: 1}} />

        <Text style={{color: '#525252', fontWeight: 'bold', fontSize: 17, flex: 1}}>나의 통계</Text>

        <TouchableOpacity style={{width: 64, backgroundColor: '#EEEEEE', borderRadius: 50}} onPress={handleShareBtnPress}>
          <Text style={{color: '#525252',  padding: 7, fontWeight: 700}}>공유하기</Text>
        </TouchableOpacity>
      </View>

    {
      (myStatistics == null || !isLoaded) ? <LoadingScreen iconId={loadingIcon} showText={false} />:
        <ScrollView ref={viewRef}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.mainText}>
                <Text style={{color: '#5D70F9'}}>아이디</Text>님의 티켓스토리
              </Text>
            </View>
            <View style={styles.mainContent}>
              {/* 관람한 콘텐츠 */}
              <View style={{marginTop: 25, paddingBottom: 32, borderBottomColor: '#0000001A', borderBottomWidth: 1}}>
                <Text style={{...styles.mainText, fontSize: 20, marginBottom: 24}}>관람한 콘텐츠</Text>
                <View style={styles.contentContainer}>
                  <View style={styles.rowContainer}>
                    <Text style={styles.categoryText}>영화 <Text style={{color: '#5D70F9', fontWeight: 700, fontSize: 24}}>   {movieStats && movieStats.viewCount} </Text>편</Text>
                    <Text style={styles.categoryText}>뮤지컬 <Text style={{color: '#5D70F9', fontWeight: 700, fontSize: 24}}>   {musicalStats && musicalStats.viewCount} </Text>편</Text>
                  </View>
                  <View style={styles.rowContainer}>
                    <Text style={styles.categoryText}>연극 <Text style={{color: '#5D70F9', fontWeight: 700, fontSize: 24}}>   {playStats && playStats.viewCount} </Text>편</Text>
                    <Text style={styles.categoryText}>스포츠 <Text style={{color: '#5D70F9', fontWeight: 700, fontSize: 24}}>   {sportsStats && sportsStats.viewCount} </Text>편</Text>
                  </View>
                </View>
              </View>

              {/* 평균 콘텐츠 점수 */}
              <View style={{paddingBottom: 32, borderBottomColor: '#0000001A', borderBottomWidth: 1}}>
                <Text style={{ ...styles.mainText, fontSize: 20, marginTop: 36, marginBottom: 22 }}>평균 콘텐츠 점수</Text>
                <View style={{gap: 10}}>
                  <View style={styles.barRow}>
                    <Text style={{...styles.categoryText, width: 50, marginRight: 20, textAlign: 'right'}}>영화</Text>
                    <View style={styles.bar}>
                      <View style={getFilledBarStyle(movieStats.averageScore)} />
                    </View>
                    <Text style={styles.scoreText}>{movieStats.viewCount != 0 ? movieStats.averageScore: ""}</Text>
                  </View>
                  <View style={styles.barRow}>
                    <Text style={{...styles.categoryText, width: 50, marginRight: 20, textAlign: 'right'}}>연극</Text>
                    <View style={styles.bar}>
                      <View style={getFilledBarStyle(playStats.averageScore)} />
                    </View>
                    <Text style={styles.scoreText}>{playStats.viewCount != 0 ? playStats.averageScore: ""}</Text>
                  </View>
                  <View style={styles.barRow}>
                    <Text style={{...styles.categoryText, width: 50, marginRight: 20, textAlign: 'right'}}>뮤지컬</Text>
                    <View style={styles.bar}>
                      <View style={getFilledBarStyle(musicalStats.averageScore)} />
                    </View>
                    <Text style={styles.scoreText}>{musicalStats.viewCount != 0 ? musicalStats.averageScore: ""}</Text>
                  </View>
                  <View style={styles.barRow}>
                    <Text style={{...styles.categoryText, width: 50, marginRight: 20, textAlign: 'right'}}>스포츠</Text>
                    <View style={styles.bar}>
                      <View style={getFilledBarStyle(sportsStats.averageScore)} />
                    </View>
                    <Text style={styles.scoreText}>{sportsStats.viewCount != 0 ? sportsStats.averageScore: ""}</Text>
                  </View>
                </View>
              </View>

              {/* 방문한 문화 공간 */}
              <View>
                <Text style={{...styles.mainText, fontSize: 20, marginVertical: 20}}>방문한 문화 공간</Text>
                <View style={styles.locationContainer}>
                  <Text style={styles.locationText}>영화관 <Text style={{color: '#5D70F9', fontWeight: 700, fontSize: 22}}> {locationCountStats.movieLocationCount} </Text>곳</Text>
                  <Text style={styles.locationText}>공연장 <Text style={{color: '#5D70F9', fontWeight: 700, fontSize: 22}}> {locationCountStats.performanceLocationCount} </Text>곳</Text>
                  <Text style={styles.locationText}>경기장 <Text style={{color: '#5D70F9', fontWeight: 700, fontSize: 22}}> {locationCountStats.sportsLocationCount} </Text>곳</Text>
                </View>

                  {/* locationCount  분류, 장소명, 방문횟수 */}
                  <View>
                    <View style={styles.tableHeader}>
                      <Text style={styles.columnHeader}>분류</Text>
                      <Text style={styles.columnHeader}>장소명</Text>
                      <Text style={styles.columnHeader}>방문횟수</Text>
                    </View>
                    {locationListStats.slice(0,10).map((location, index) => (
                      <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{location.locationType}</Text>
                        <Text style={styles.tableCell}>{location.locationName}</Text>
                        <Text style={styles.tableCell}>{location.count}</Text>
                      </View>
                    ))}
                    <View style={{alignItems: 'center', paddingVertical: 10, marginBottom: 30, borderBottomColor: '#0000001A', borderBottomWidth: 1}}>
                      <Text style={{color: '#D9D9D9', fontSize: 14}}>방문한 문화 공간은 상위 10곳만 나타납니다.</Text>
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
  locationContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  locationText: {
    color: '#9A9A9A',
    fontWeight: '800',
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
    fontWeight: 'bold',
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
    fontWeight: 800,
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
    fontWeight: 500,
  },
});

export default My;