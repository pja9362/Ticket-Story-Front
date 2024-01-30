import axios from 'axios';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = 'http://192.168.0.10:8080'; 

const checkIdDuplicate = async userId => {
  try {
    const response = await axios.get(`${apiUrl}/auth/isIdDuplicate/${userId}`);
    console.log('ID duplicate check response:', response.data);
    return response.data;
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
        phoneNum: formData.phoneNum,
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
    return response.data;
  } catch (error) {
    console.error('Sign-up error:', error);
    throw error;
  }
};

const signInRequest = async (userId, password) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/v1/auth/login`,
      {
        id: userId,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('Sign-in response:', response.data);
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

export default {checkIdDuplicate, signUpRequest, signInRequest, saveImageAndPerformOCR, handleKaKaoLogin};
