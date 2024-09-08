import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../CustomText';

const Total = ({data}) => {

  const getFilledBarStyle = (score) => ({
    height: '100%', 
    width: `${score}%`, 
    backgroundColor: '#5D70F9', 
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: score == 100 ? 5 : 0,
    borderBottomRightRadius: score == 100 ? 5 : 0,
  });

  return (
    <>
        {/* 평균 콘텐츠 점수 */}
        <View style={{ paddingBottom: 32, borderBottomColor: '#0000001A', borderBottomWidth: 1 }}>
            <CustomText style={{ ...styles.mainText, marginVertical: 20 }} fontWeight="bold">전체 평균 콘텐츠 점수</CustomText>
            <View style={{ gap: 10 }}>
                <View style={styles.barRow}>
                <CustomText style={{ ...styles.categoryText, width: 50, marginRight: 20, textAlign: 'right' }} fontWeight="bold">전체</CustomText>
                <View style={styles.bar}>
                    <View style={getFilledBarStyle(data.totalAverageScore)} />
                </View>
                <CustomText style={styles.scoreText} fontWeight="bold">{data.totalViewCount != 0 ? data.totalAverageScore : ""}</CustomText>
                </View>
                <View style={styles.barRow}>
                <CustomText style={{ ...styles.categoryText, width: 50, marginRight: 20, textAlign: 'right' }} fontWeight="bold">영화</CustomText>
                <View style={styles.bar}>
                    <View style={getFilledBarStyle(data.movieAverageScore)} />
                </View>
                <CustomText style={styles.scoreText} fontWeight="bold">{data.movieViewCount != 0 ? data.movieAverageScore : ""}</CustomText>
                </View>
                <View style={styles.barRow}>
                <CustomText style={{ ...styles.categoryText, width: 50, marginRight: 20, textAlign: 'right' }} fontWeight="bold">공연</CustomText>
                <View style={styles.bar}>
                    <View style={getFilledBarStyle(data.performanceAverageScore)} />
                </View>
                <CustomText style={styles.scoreText} fontWeight="bold">{data.performanceViewCount != 0 ? data.performanceAverageScore : ""}</CustomText>
                </View>
                <View style={styles.barRow}>
                <CustomText style={{ ...styles.categoryText, width: 50, marginRight: 20, textAlign: 'right' }} fontWeight="bold">스포츠</CustomText>
                <View style={styles.bar}>
                    <View style={getFilledBarStyle(data.sportsAverageScore)} />
                </View>
                <CustomText style={styles.scoreText} fontWeight="bold">{data.sportsViewCount != 0 ? data.sportsAverageScore : ""}</CustomText>
                </View>
            </View>
          </View>

            {/* 방문한 문화 공간 */}
          <View>
            <CustomText style={{ ...styles.mainText, marginTop: 20}} fontWeight="bold">전체 방문한 문화 공간</CustomText>
            <View style={styles.locationContainer}>
                <CustomText style={styles.locationText} fontWeight="bold">영화관 <CustomText style={{ color: '#5D70F9', fontSize: 22 }} fontWeight="bold"> {data.locationTypeCount.movieLocationCount} </CustomText>곳</CustomText>
                <CustomText style={styles.locationText} fontWeight="bold">공연장 <CustomText style={{ color: '#5D70F9', fontSize: 22 }} fontWeight="bold"> {data.locationTypeCount.performanceLocationCount} </CustomText>곳</CustomText>
                <CustomText style={styles.locationText} fontWeight="bold">경기장 <CustomText style={{ color: '#5D70F9', fontSize: 22 }} fontWeight="bold"> {data.locationTypeCount.sportsLocationCount} </CustomText>곳</CustomText>
            </View>
            <View>
                <View style={styles.tableHeader}>
                <CustomText style={styles.columnHeader} fontWeight="bold">분류</CustomText>
                <CustomText style={styles.mainColumnHeader} fontWeight="bold">장소명</CustomText>
                <CustomText style={styles.columnHeader} fontWeight="bold">방문횟수</CustomText>
                </View>

                {data.locationCount && data.locationCount.slice(0, 10).map((location, index) => (
                <View key={index} style={styles.tableRow}>
                    {/* <CustomText style={styles.tableCell} fontWeight="medium">{location.locationType}</CustomText> */}
                    <CustomText style={styles.tableCell} fontWeight="medium">
                      {location.locationType === 'MOVIE' ? '영화관' : 
                      location.locationType === 'GENERAL' ? '공연장' : 
                      location.locationType === 'SPORTS' ? '경기장' : location.locationType}
                    </CustomText>
                    <CustomText style={styles.mainTableCell} fontWeight="medium">{location.locationName}</CustomText>
                    <CustomText style={styles.tableCell} fontWeight="medium">{location.count}</CustomText>
                </View>
                ))}
                <View style={{ alignItems: 'center', paddingVertical: 10, marginBottom: 30}}>
                  <CustomText style={{ color: '#D9D9D9', fontSize: 14 }}>방문한 문화 공간은 상위 10곳만 나타납니다.</CustomText>
                </View>
            </View>
          </View>
    </>
)
}

const styles = StyleSheet.create({
    mainText: {
      color: '#525252',
      fontSize: 19,
    },
    categoryText: {
      color: '#9A9A9A',
      fontSize: 16,
    },
    locationContainer: {
      marginTop: 20,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 8
    },
    locationText: {
      color: '#9A9A9A',
      fontSize: 12,
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
    mainColumnHeader: {
      flex: 3,
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
    mainTableCell: {
      flex: 3,
      color: '#9A9A9A',
      textAlign: 'center',
    },
});

export default Total;