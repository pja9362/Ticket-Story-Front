import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';

export const saveNewTicket = async (data) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log('Access token:', accessToken);
    console.log('Saving new ticket:', data);
    const response = await axios.post(`${API_URL}/api/v1/ticket/saveNewTicket`, data, {
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