import {API_URL} from '@env';
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const checkIdDuplicate = async userId => {
  try {
    console.log(API_URL)
    const response = await axios.get(
      `${API_URL}/api/v1/auth/checkDuplicateId`, 
      {
        params: {
          id: userId,
        },
      });
    console.log('ID duplicate check response:', response.data);
    return response.data.result;
  } catch (error) {
    console.error('ID duplicate check error:', error);
    throw error;
  }
}


export const signUpRequest = async formData => {
  try {
    console.log('Sign-up request:', formData);
    const response = await axios.post(
      `${API_URL}/api/v1/auth/signup`,
      {
        id: formData.id,
        password: formData.password,
        birthday: formData.birthday,
        gender: formData.gender.toUpperCase(),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('Sign-up response:', response.data);

    if(response.data.accessToken !== null) {
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
    }
    
    return response.data;
  } catch (error) {
    console.error('Sign-up error:', error);
    throw error;
  }
};

export const signInRequest = (id, password, callback) => async dispatch => {
  const body = JSON.stringify({ id, password });

  try {
    const response = await axios.post(
      `${API_URL}/api/v1/auth/login`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('Sign-in response:', response.data);

    if(response.data.accessToken !== null) {
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
      if(callback) callback([true, response.data]);
    } else {
      if(callback) callback([false, response.data]);
    }
  }
  catch (error) {
    console.error('Sign-in error:', error);
    if(callback) callback([false, error]);
  }
}

export const handleOAuthKaKaoLogin = async () => {
  try {
    console.log('handleKaKaoLogin');
    const response = await axios.get(`${API_URL}/api/v1/auth/oauth/kakao/url`);
    console.log('Kakao login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Kakao login error:', error);
    throw error;
  }
};

export const saveTokens = async (url) => {
  try {
    console.log('Saving tokens:', url)
    const response = await axios.get(url);
    console.log('Token response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error extracting and storing tokens:', error);
    throw error;
  }
};
