// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_URL } from '@env';

// // const checkIdDuplicate = async userId => {
// //   try {
// //     const response = await axios.get(
// //       `${API_URL}/api/v1/auth/checkDuplicateId`, 
// //       {
// //         params: {
// //           id: userId,
// //         },
// //       });
// //     console.log('ID duplicate check response:', response.data);
// //     return response.data.result;
// //   } catch (error) {
// //     console.error('ID duplicate check error:', error);
// //     throw error;
// //   }
// // };

// // const signUpRequest = async formData => {
// //   try {
// //     console.log('Sign-up request:', formData);
// //     const response = await axios.post(
// //       `${API_URL}/api/v1/auth/signup`,
// //       {
// //         id: formData.id,
// //         password: formData.password,
// //         birthday: formData.birthday,
// //         gender: formData.gender.toUpperCase(),
// //       },
// //       {
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //       },
// //     );
// //     console.log('Sign-up response:', response.data);

// //     if(response.data.accessToken !== null) {
// //       await AsyncStorage.setItem('accessToken', response.data.accessToken);
// //       await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
// //     }
    
// //     return response.data;
// //   } catch (error) {
// //     console.error('Sign-up error:', error);
// //     throw error;
// //   }
// // };

// // const signInRequest = async (id, password) => {
// //   try {
// //     console.log('Sign in request ', id, password);
// //     console.log("API ENDPOINT: ", `${API_URL}/api/v1/auth/login`);
// //     const response = await axios.post(
// //       `${API_URL}/api/v1/auth/login`,
// //       {
// //         id: id,
// //         password: password,
// //       },
// //       {
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //       },
// //     );
// //     console.log('Sign-in response:', response.data);
    
// //     // login success
// //     if(response.data.accessToken !== null) {
// //       await AsyncStorage.setItem('accessToken', response.data.accessToken);
// //       await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
// //     }

// //     return response.data;
// //   } catch (error) {
// //     console.error('Sign-in error:', error);
// //     throw error;
// //   }
// // };

// const saveImageAndPerformOCR = async (scannedImageUri) => {
//   try {
//     const category = "MOVIE";

//     console.log('Saving image and performing OCR:', scannedImageUri);
    
//     await AsyncStorage.removeItem('ticket');
    
//     const formData = new FormData();
//     formData.append('category', category);
//     formData.append('img', {
//       uri: scannedImageUri,
//       name: 'image.jpg',
//       type: 'image/jpeg',
//     });

//     const response = await axios.post(`${API_URL}/api/v1/ocr/ocr`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     console.log('OCR response:', response.data);
    
//     await AsyncStorage.setItem('ticket', JSON.stringify(response.data));
    
//   } catch (error) {
//     console.error('Error saving image to file or performing OCR:', error);
//   }
// };

// // const handleKaKaoLogin = async () => {
// //   try {
// //     console.log('handleKaKaoLogin');
// //     const response = await axios.get(`${API_URL}/api/v1/auth/oauth/kakao/url`);
// //     console.log('Kakao login response:', response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Kakao login error:', error);
// //     throw error;
// //   }
// // };

// const saveNewTicket = async (ticket) => {
//   try {
//     const accessToken = await AsyncStorage.getItem('accessToken');
//     console.log('Access token:', accessToken);
//     console.log('Saving new ticket:', ticket);
//     const response = await axios.post(`${API_URL}/api/v1/ticket/saveNewTicket`, ticket, {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json;charset=UTF-8',
//         'Authorization': `Bearer ${accessToken}`,
//       },
//     });
//     console.log('Save new ticket response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error saving new ticket:', error);
//     throw error;
//   }
// }

// export default {saveImageAndPerformOCR, saveNewTicket};
