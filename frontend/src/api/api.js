import axios from 'axios';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = 'http://172.30.1.47:8080'; 

const checkIdDuplicate = async userId => {
  try {
    console.log('ID duplicate check:', userId); 
    const response = await axios.get(
      `${apiUrl}/api/v1/auth/checkDuplicateId`, 
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
};

const signUpRequest = async formData => {
  try {
    console.log('Sign-up request:', formData);
    const response = await axios.post(
      `${apiUrl}/api/v1/auth/signup`,
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

const signInRequest = async (id, password) => {
  try {
    console.log('Sign in request ', id, password);
    
    const response = await axios.post(
      `${apiUrl}/api/v1/auth/login`,
      {
        id: id,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('Sign-in response:', response.data);
    
    // login success
    if(response.data.accessToken !== null) {
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
    }

    return response.data;
  } catch (error) {
    console.error('Sign-in error:', error);
    throw error;
  }
};

const saveImageAndPerformOCR = async (scannedImage) => {
  try {
    await AsyncStorage.removeItem('ticket');
    console.log('Saving image to file...');
    const path = `${RNFS.CachesDirectoryPath}/scannedImage.jpg`;

    // Decode base64 and save as a file
    await RNFS.writeFile(path, scannedImage, 'base64');

    console.log('Image saved to:', path);

    const formData = new FormData();
    formData.append('img', {
      uri: `file://${path}`,
      name: 'scannedImage.jpg',
      type: 'image/jpeg',
    });

    const response = await axios.post(`${apiUrl}/ocr/ocr-api`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('OCR response:', response.data);
    await AsyncStorage.setItem('ticket', JSON.stringify(response.data));
  } catch (error) {
    console.error('Error saving image to file or performing OCR:', error);
  }
};

const handleKaKaoLogin = async () => {
  try {
    console.log('handleKaKaoLogin');
    const response = await axios.get(`${apiUrl}/api/v1/auth/oauth/kakao/url`);
    console.log('Kakao login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Kakao login error:', error);
    throw error;
  }
};

const saveTokens = async (url) => {
  try {
    console.log('Saving tokens:', url)
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error extracting and storing tokens:', error);
    throw error;
  }
};

export default {checkIdDuplicate, signUpRequest, signInRequest, saveImageAndPerformOCR, handleKaKaoLogin, saveTokens};
