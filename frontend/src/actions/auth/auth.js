import {API_URL} from '@env';
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
} from './types';
import {
  UPDATE_TICKET_SUCCESS
} from './../ticket/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const refreshTokens = async () => {
  console.log("!!! 리프레시 토큰 재발급 요청!")
  const refreshToken = await AsyncStorage.getItem('refreshToken');

  try {
    const response = await axios.post(
      `${API_URL}/api/v1/auth/reIssueTokens`,
      { refreshToken: refreshToken },
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (response.data.accessToken) {
      console.log('TOKEN 재발급 성공');

      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data;
    } else {
      console.log("REFRESH TOKEN 만료");
      return null;
    }
  } catch (error) {
    console.error('Error refreshing tokens:', error);
    return null;
  }
};

export const requestWithRetry = async (callback) => {
  try {
    const response = await callback();
    return response;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.log("토큰 만료 403 에러 발생, refresh token 요청해야 함")
      const newTokens = await refreshTokens();
      console.log("새 토큰 요청 성공 ", newTokens)
      const newAccess = await AsyncStorage.getItem('accessToken')
      const newRefresh = await AsyncStorage.getItem('refreshToken')
      if (newTokens) {

        console.log("새 토큰 활용 콜백함수 실행")
        console.log("새 액세스 토큰: ", newAccess)
        console.log("새 리프레시 토큰: ", newRefresh)

        try {
          const retryResponse = await callback();
          console.log(retryResponse);

          return retryResponse;
        } catch (retryError) {
          console.error('Error on retrying request:', retryError);
          throw retryError;
        }
      } else {
        throw new Error('Session expired. Please log in again.');
      }
    } else {
      throw error;
    }
  }
};

export const checkIdDuplicate = async (userId) => {
  return requestWithRetry(async () => {
    const response = await axios.get(
      `${API_URL}/api/v1/auth/checkDuplicateId`, 
      { params: { id: userId } }
    );
    console.log('ID duplicate check response:', response.data);
    return response.data.result;
  });
};

export const sendEmail = async (userId) => {
  return requestWithRetry(async () => {
    const response = await axios.get(
      `${API_URL}/api/v1/auth/password/sendPasswordCertification`, 
      {
        headers: { 'Content-Type': 'application/json' },
        params: { userId: userId }
      }
    );
    console.log('Send Email check response:', response.data);
    return response.data.result;
  });
};

export const signUpRequest = async (formData) => {
  return requestWithRetry(async () => {
    const response = await axios.post(
      `${API_URL}/api/v1/auth/signup`,
      {
        id: formData.id,
        password: formData.password,
        birthday: formData.birthday,
        gender: formData.gender.toUpperCase(),
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('Sign-up response:', response.data);
    if (response.data.accessToken !== null) {
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data;
  });
};

export const signInRequest = (id, password, callback) => async dispatch => {
  const body = JSON.stringify({ id, password });

  return requestWithRetry(async () => {
    const response = await axios.post(
      `${API_URL}/api/v1/auth/login`,
      body,
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('Sign-in response:', response.data);

    if (response.data.accessToken !== null) {
      console.log('refreshToken', response.data.refreshToken);
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      dispatch({ type: UPDATE_TICKET_SUCCESS });

      if (callback) callback([true, response.data]);
    } else {
      if (callback) callback([false, response.data]);
    }
  });
};

export const logoutRequest = (callback) => async dispatch => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');

  return requestWithRetry(async () => {
    const response = await axios.post(
      `${API_URL}/api/v1/auth/logout`,
      { refreshToken: refreshToken },
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (response.data.result) {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');

      dispatch({ type: LOGOUT_SUCCESS, payload: response.data });
      if (callback) callback([true, response.data]);
    } else {
      console.log('Logout not success: ', response.data);
      if (callback) callback([false, response.data]);
    }
  });
};

export const handleOAuthKaKaoLogin = async () => {
  return requestWithRetry(async () => {
    const response = await axios.get(`${API_URL}/api/v1/auth/oauth/kakao/url`);
    console.log('Kakao login response:', response.data);
    return response.data;
  });
};

export const saveTokens = (url, callback) => async dispatch => {
  return requestWithRetry(async () => {
    const response = await axios.get(url);
    console.log('SAVE TOKEN 함수 실행 Token response:', response.data);

    if (response.data.accessToken !== null) {
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);

      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      dispatch({ type: UPDATE_TICKET_SUCCESS });

      if (callback) callback([true, response.data]);
    } else {
      if (callback) callback([false, response.data]);
    }
  });
};

export const sendPasswordResetEmail = async (email) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return requestWithRetry(async () => {
    const response = await axios.post(
      `${API_URL}/api/v1/auth/password/sendPasswordCertification`,
      { email },
      { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` } }
    );
    console.log('Password reset email response:', response.data);
    return response.data;
  });
};

export const verfiyPasswordResetCode = async (userId, code) => {
  const body = JSON.stringify({ userId, code });

  return requestWithRetry(async () => {
    const response = await axios.post(
      `${API_URL}/api/v1/auth/password/verifyCertificationCode`,
      body,
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('Password reset code verification response:', response.data);

    if (response.data.accessToken !== null) {
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      return response.data;
    } else {
      console.log(response.data.accessToken);
    }
  });
};

export const resetPassword = async (password, token) => {
  console.log('22222', password);

  return requestWithRetry(async () => {
    const response = await axios.post(
      `${API_URL}/api/v1/auth/password/changePassword`,
      { password: password },
      { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8', 'Authorization': `Bearer ${token}` } }
    );
    console.log('Password reset response:', response.data);
    return response.data;
  });
};

export const checkPassword = async password => {
  const token = await AsyncStorage.getItem('accessToken');

  return requestWithRetry(async () => {
    const response = await axios.post(
      `${API_URL}/api/v1/auth/password/getChangeAuth`,
      { password: password },
      { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8', 'Authorization': `Bearer ${token}` } }
    );
    console.log('Password check response:', response.data);
    return response.data;
  });
};

export const deleteAccount = async (survey, token) => {
  return requestWithRetry(async () => {
    const response = await axios.post(
      `${API_URL}/api/v1/auth/quitTicketStory`,
      { survey: survey },
      { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8', 'Authorization': `Bearer ${token}` } }
    );
    console.log('Delete Account response:', response.data);
    return response.data;
  });
};