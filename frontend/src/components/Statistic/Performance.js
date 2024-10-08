import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../CustomText';

const Performance = ({ data }) => {
  
    const getFilledBarStyle = (score) => ({
      height: '100%', 
      width: `${score}%`, 
      backgroundColor: '#5D70F9', 
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      borderTopRightRadius: score == 100 ? 5 : 0,
      borderBottomRightRadius: score == 100 ? 5 : 0,
    });

    
    const convertTabToViewCount = (tab) => {
        switch (tab) {
            case '뮤지컬':
                return data.musicalViewCount;
            case '연극':
                return data.playViewCount;
            case '기타':
                return data.otherViewCount;
            default:
                return 0;
        }
    }

    return (
        <>
            {/* 관람 횟수 세부 분류 */}
            <View style={{ paddingBottom: 20, borderBottomColor: '#0000001A', borderBottomWidth: 1 }}>
                <CustomText style={{ ...styles.mainText, marginVertical: 20 }} fontWeight="bold">관람 횟수 세부 분류</CustomText>
                <View style={styles.categoryContainer}>
                    {['뮤지컬', '연극', '기타'].map((tab, index) => (
                        <View key={index}>
                            <CustomText style={{ textAlign: 'center', color: '#525252', fontSize: 20}} fontWeight="bold">{convertTabToViewCount(tab)}</CustomText>
                            <CustomText style={{ textAlign: 'center', color: '#9A9A9A', fontSize: 15, paddingTop: 6, fontWeight: 700}} >{tab}</CustomText>
                        </View>
                    ))}
                </View>
            </View>

            {/* 평균 콘텐츠 점수 */}
            <View style={{ paddingBottom: 20, borderBottomColor: '#0000001A', borderBottomWidth: 1 }}>
                <CustomText style={{ ...styles.mainText, marginVertical: 20 }} fontWeight="bold">공연 평균 콘텐츠 점수</CustomText>
                {[data.musicalAverageScore, data.playAverageScore, data.otherAverageScore].map((score, index) => (
                    <View key={index} style={styles.barRow}>
                        <CustomText style={{ ...styles.categoryText, width: 60, marginRight: 12, textAlign: 'right' }} fontWeight="bold">{['뮤지컬', '연극', '기타'][index]}</CustomText>
                        <View style={styles.bar}>
                            <View style={getFilledBarStyle(score)} />
                        </View>
                        <CustomText style={styles.scoreText} fontWeight="bold">{score}</CustomText>
                    </View>
                ))}
            </View>

            {/* 방문한 공연장 */}
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <CustomText style={{ ...styles.mainText, marginTop: 20}} fontWeight="bold">방문한 공연장</CustomText>
                  <CustomText style={styles.locationText} fontWeight="bold">총<CustomText style={{ color: '#5D70F9', fontSize: 22 }} fontWeight="bold"> {data.playLocationCount} </CustomText>곳</CustomText>
                </View>

                {/* locationCount  분류, 장소명, 방문횟수 */}
                <View>
                    <View style={styles.tableHeader}>
                      <CustomText style={styles.columnHeader} fontWeight="bold">분류</CustomText>
                      <CustomText style={styles.mainColumnHeader} fontWeight="bold">장소명</CustomText>
                      <CustomText style={styles.columnHeader} fontWeight="bold">방문횟수</CustomText>
                    </View>
                    {data.locationCount && data.locationCount.map((location, index) => (
                        <View key={index} style={styles.tableRow}>
                            <CustomText style={styles.tableCell} fontWeight="medium">공연장</CustomText>
                            <CustomText style={styles.mainTableCell} fontWeight="medium">{location.locationName}</CustomText>
                            <CustomText style={styles.tableCell} fontWeight="medium">{location.count}</CustomText>
                        </View>
                    ))}
                  </View>

                  <View style={{ alignItems: 'center', paddingVertical: 10, marginBottom: 30}}>
                    <CustomText style={{ color: '#D9D9D9', fontSize: 14 }}>방문한 문화 공간은 상위 10곳만 나타납니다.</CustomText>
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
      marginTop: 15,
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
    categoryContainer: {
      flex: 1,
      flexDirection: 'row',
      gap: 60,
      justifyContent: 'center',
    },
    mainColumnHeader: {
      flex: 3,
      color: '#9A9A9A',
      textAlign: 'center',
      paddingVertical: 5,
    },
    mainTableCell: {
      flex: 3,
      color: '#9A9A9A',
      textAlign: 'center',
    },
});

export default Performance;
