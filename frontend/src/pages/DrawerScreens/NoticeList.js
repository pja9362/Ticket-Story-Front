import React, { useEffect, useState, useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation  } from '@react-navigation/native';
import {CustomText} from '../../components/CustomText';
import Header from '../../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { getNotices, getNoticeDetails } from '../../actions/notice/notice';
import analytics from '@react-native-firebase/analytics';

const NoticeList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const auth = useSelector((state) => state.auth.isAuthenticated);
  // const totalPages = useSelector((state) => state.ticket.myTickets.totalPages);
  const [page, setPage] = useState(0);
  const [allNotices, setAllNotices] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    analytics().logScreenView({
      screen_name: '공지사항',
      screen_class: 'menu'
    })
  }, [])


  const refreshNotices = useCallback(() => {

      setPage(0); // Reset page to 0 when refreshing
      setAllNotices([]); // Clear current tickets

      const response = getNotices(0, (newNotices) => {
        setAllNotices([]);
        setAllNotices(newNotices);
        const currentPage = Math.floor(newNotices.length / 10);
        setTotalPages(currentPage)
      });

  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshNotices();
    }, [refreshNotices])
  );

  useEffect(() => {
    if (page > 0) {
      const response = getNotices(page, (newNotices) => {
        setAllNotices((prevNotices) => [...prevNotices, ...newNotices]);
        console.log('뿌잉',allNotices);
      });
    }
  }, [page]);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 30;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      if (page <= totalPages - 1) {
        setPage(page + 1);
      }
    }
  };

  const handleDetail = async (noticeId) => {
    const gotNoticeDetails = await getNoticeDetails(noticeId)
    if (gotNoticeDetails) {
      navigation.navigate('NoticeContent', {gotNoticeDetails});
    } else {
      alert('공지사항 조회 실패');
    }
  }

  return (
    <View style={styles.container}>
    <Header title='공지사항'/>
    <ScrollView showsVerticalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={64}>
    <View style={{ flex: 1 }}>


      {allNotices && allNotices.length !== 0 ? allNotices.map((notice, index) => (

            <View key={index}>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleDetail(notice.noticeId)}>
                <CustomText style={styles.menuText} fontWeight="bold">{notice.noticeTitle}</CustomText>
                <CustomText style={styles.menuTextDate}>{notice.createdDate}</CustomText>
              </TouchableOpacity>
            </View>

          ))
          : (
            <CustomText style={styles.menuText} fontWeight="bold">공지사항 없음</CustomText>
          )
      }


    </View>
    </ScrollView>
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 0
  },
  menuItem: {
    paddingLeft: 10,
    marginTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomStartRadius : 5, 
    borderBottomEndRadius : 5, 
  },
  menuText: {
    marginBottom: 8,
    fontSize: 16,
    color: '#525252',
  },
  menuTextDate: {
    fontSize: 13,
    color: '#525252',
  }
});

export default NoticeList;
