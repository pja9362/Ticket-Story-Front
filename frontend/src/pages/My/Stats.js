import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { handleShareBtn } from '../../utils/shareAndSaveUtils';
import { CustomText } from '../../components/CustomText';
import Total from '../../components/Statistic/Total';
import Movie from '../../components/Statistic/Movie';
import Performance from '../../components/Statistic/Performance';
import Sports from '../../components/Statistic/Sports';
import DropDownPicker from 'react-native-dropdown-picker';
import { loadMyStatistics, loadMovieStats, loadPerformanceStats, loadSportsStats } from '../../actions/statistics/statistics';
import LoadingScreen from '../../components/LoadingScreen';
import { setDefaultOrder } from '../../actions/ticket/ticket';

const Stats = () => {
  const viewRef = useRef();
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState('전체');

  const [openOrder, setOpenOrder] = useState(false);
  // const [defaultOrder, setDefaultOrder] = useState('everything');
  const defaultOrder = useSelector((state) => state.filter.defaultOrder);
  
  const [orders, setOrders] = useState([
    {label: '전체', value: 'everything'},
    {label: '2024', value: '2024'},
    {label: '2023', value: '2023'},
    {label: '2021', value: '2021'},
    {label: '2020', value: '2020'},
    {label: '2019', value: '2019'},
    {label: '2018', value: '2018'},
    {label: '2017', value: '2017'},
    {label: '2016', value: '2016'},
    {label: '2015', value: '2015'},
    {label: '2014', value: '2014'},
    {label: '2013', value: '2013'},
    {label: '2012', value: '2012'},
    {label: '2011', value: '2011'},
    {label: '2010', value: '2010'},
    {label: '2009', value: '2009'},
    {label: '2008', value: '2008'},
    {label: '2007', value: '2007'},
    {label: '2006', value: '2006'},
    {label: '2005', value: '2005'},
    {label: '2004', value: '2004'},
    {label: '2003', value: '2003'},
    {label: '2002', value: '2002'},
    {label: '2001', value: '2001'},
    {label: '2000', value: '2000'},
  ]);

  const basicStats = useSelector((state) => state.statistics.basicStats);
  const sportsStats = useSelector((state) => state.statistics.sportsStats);
  const performanceStats = useSelector((state) => state.statistics.performanceStats);
  const movieStats = useSelector((state) => state.statistics.movieStats);

  const handleShareBtnPress = () => {
    handleShareBtn(viewRef);
  };

  // 선택된 탭에 따라 다른 콘텐츠를 렌더링
  const renderContent = () => {
    switch (selectedTab) {
      case '영화':
        return (
          movieStats ? <Movie data={movieStats}/> : null
        );
      case '공연':
        return (
          performanceStats ? <Performance data={performanceStats}/> : null
        );
      case '스포츠':
        return (
          sportsStats ? <Sports data={sportsStats}/> : null
        );
      default:
        return (
          basicStats ? <Total data={basicStats}/> : null
        );
    }
  };

  const convertTabToViewCount = (tab) => {
    switch (tab) {
      case '전체':
        return basicStats ? basicStats.totalViewCount : 0;
      case '영화':
        return basicStats ? basicStats.movieViewCount : 0;
      case '공연':
        return basicStats ? basicStats.performanceViewCount : 0;
      case '스포츠':
        return basicStats ? basicStats.sportsViewCount : 0;
      default:
        return 0;
    }
  }

  const onOrderChange = (value) => {
    dispatch(setDefaultOrder(value));
    console.log(value);
  };
  
  const isLoaded = movieStats && sportsStats && performanceStats && basicStats;

  useEffect(() => {
    if (!isLoaded) {
      dispatch(loadMyStatistics(defaultOrder));
      dispatch(loadMovieStats(defaultOrder));
      dispatch(loadPerformanceStats(defaultOrder));
      dispatch(loadSportsStats(defaultOrder));
    }
  }, []); 
  
  useEffect(() => {
    if (defaultOrder) {
      dispatch(loadMyStatistics(defaultOrder));
      dispatch(loadMovieStats(defaultOrder));
      dispatch(loadPerformanceStats(defaultOrder));
      dispatch(loadSportsStats(defaultOrder));
    }
  }, [defaultOrder]); 

  
  const [loadingIcon, setLoadingIcon] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingIcon((prevIcon) => (prevIcon % 4) + 1);
    }, 200);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 12, zIndex:1 }}>

        <View style={{flex: 1}}>
          <DropDownPicker
            style={{width: 85, minHeight: 10, borderColor: '#525252'}}
            containerStyle={{marginLeft:5, width: 85, minHeight: 30}}
            dropDownContainerStyle={{borderColor: '#525252'}}
            labelStyle={{fontFamily: 'Pretendard-Medium', fontSize: 12}}
            textStyle={{fontFamily: 'Pretendard-Regular', fontSize: 12}}
            listItemContainerStyle={{height:33, borderBottomWidth: 1, borderBottomColor: '#EEEEEE', borderBottomStartRadius : 10, borderBottomEndRadius : 10}}
            selectedItemLabelStyle={{fontFamily: 'Pretendard-Medium'}}
            showTickIcon={false}
            open={openOrder}
            value={defaultOrder}
            items={orders}
            setOpen={setOpenOrder}
            setValue={(callback) => {
              const value = callback(defaultOrder);
              onOrderChange(value);
            }}
            setItems={setOrders}
          />
        </View>
        <View style={{flex: 1}}>
          <CustomText style={{ color: '#525252', fontSize: 17, textAlign: 'center' }} fontWeight="bold">나의 통계</CustomText>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 5}}>
          <TouchableOpacity style={{width: 64, backgroundColor: '#EEEEEE', borderRadius: 50}} onPress={handleShareBtnPress}>
            <CustomText style={{ color: '#525252', paddingVertical: 7, fontSize: 13, paddingHorizontal: 9 }} fontWeight="bold">공유하기</CustomText>
          </TouchableOpacity>
        </View>
      </View>

      {
        !isLoaded ? <LoadingScreen iconId={loadingIcon} showText={false} /> :
          <ScrollView>
            <View
              style={{backgroundColor: '#fff'}}
              collapsable={false}
              ref={viewRef}
            >
              <View style={styles.mainContent}>
                {/* 분야별 관람 횟수 */}
                <View style={{ paddingTop: 10, paddingBottom: 20, borderBottomColor: '#0000001A', borderBottomWidth: 1 }}>
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
