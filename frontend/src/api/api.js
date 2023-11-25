import axios from 'axios';

// const apiUrl = 'http://192.168.25.3:8080'; 집
const apiUrl = 'http://192.168.0.98:8080'; 

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
    const response = await axios.post(
      `${apiUrl}/auth/signUp`,
      {
        birthday: 20001221,
        gender: formData.gender.toUpperCase(),
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        userId: formData.userId,
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
      `${apiUrl}/auth/signIn`,
      {
        password: password,
        userId: userId,
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

export default {checkIdDuplicate, signUpRequest, signInRequest};
