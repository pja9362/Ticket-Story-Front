import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getNotices = async (page, callback) => {
    console.log(page);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('채', accessToken);
      const response = await axios.get(`${API_URL}/api/v1/notice/getNotices`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${accessToken}`,
        },
        params: {
          page: page
        }
      });
      console.log('ㄷㄱㄷㄱ',response.data);
      if (response.data != null) {
        callback(response.data.contents);
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching notice lists:', error.response.data);
      throw error;
    }
  }


  export const getNoticeDetails = async (noticeId) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}/api/v1/notice/getNoticeDetails`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${accessToken}`,
        },
        params: {
          noticeId : noticeId
        }
      });
      console.log('ㄷㄱㄷㄱ',response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching notices details:', error.response.data);
      throw error;
    }
  }