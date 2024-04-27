import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';

export const saveNewTicket = async (data) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log('Access token:', accessToken);
    const response = await axios.post(`https://ticketstory.shop/api/v1/ticket/saveNewTicket`, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('Save new ticket response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error saving new ticket:', error);
    throw error;
  }
}

export const saveImageAndPerformOCR = async (scannedImageUri) => {
  try {    
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log('Access token:', accessToken);

    const category = "MOVIE";

    console.log('Saving image and performing OCR:', scannedImageUri);
    
    await AsyncStorage.removeItem('ticket');
    
    const formData = new FormData();
    formData.append('category', category);
    formData.append('img', {
      uri: scannedImageUri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    const response = await axios.post(`${API_URL}/api/v1/ocr/ocr`, formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('OCR response:', response.data);
    
    await AsyncStorage.setItem('ticket', JSON.stringify(response.data));
    
  } catch (error) {
    console.error('Error saving image to file or performing OCR:', error);
  }
};