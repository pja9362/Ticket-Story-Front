import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';
import {
  LOAD_MY_TICKETS_SUCCESS,
  LOAD_MY_TICKETS_FAIL,
  LOAD_TICKET_DETAIL_SUCCESS,
  LOAD_TICKET_DETAIL_FAIL,
} from './types';

export const saveNewTicket = async (data) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log('Access token:', accessToken);
    console.log('Data:', data)
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

export const deleteTicket = async (data) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log('Access token:', accessToken);
    console.log('Data:', data)
    const response = await axios.delete(`${API_URL}/api/v1/ticket/deleteTicket`,  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        ticketId: data.ticketId,
      }
    });

    console.log('Delete ticket response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting ticket:', error);
    throw error;
  }
}

export const getTicketDetails = async (data) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log('Access token:', accessToken);
    console.log('Data:', data)
    const response = await axios.delete(`${API_URL}/api/v1/ticket/getTicketDetails`,  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        ticketId: data.ticketId,
      }
    });
    console.log('ticket detail response:', response.data);
    if (response.data !== null) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting ticket detial:', error);
    throw error;
  }
}

export const updateTicket = async (ticketId, data) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log('Access token:', accessToken);
    console.log('editTicket-----------------', ticketId);
    console.log('Data-------------------', data);
    const response = await axios.patch(`${API_URL}/api/v1/ticket/updateTicket`, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        ticketId: ticketId,
      }
    });
    console.log('Update ticket response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating ticket:', error);
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

export const getMyTickets = (page, size, order, orderBy, callback) => async dispatch => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await axios.get(`${API_URL}/api/v1/ticket/getTicketBookTickets`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        page: page,
        pageSize: size,
        order: order,
        orderBy: orderBy,
        category: ""
      }
    });
    if (response.data != null) {
      dispatch({
        type: LOAD_MY_TICKETS_SUCCESS,
        payload: response.data,
      });
      callback(response.data.contents);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching my tickets:', error);
    dispatch({
      type: LOAD_MY_TICKETS_FAIL,
    });
    throw error;
  }
}

export const getTicketDetail = (ticketId) => async dispatch => {
  try {
    console.log('dd', ticketId);
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await axios.get(`${API_URL}/api/v1/reviews/getReviewDetails`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        ticketId: ticketId,
      }
    });
    if (response.data != null) {
      console.log('??:', response.data);
      dispatch({
        type: LOAD_TICKET_DETAIL_SUCCESS,
        payload: response.data,
      });
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching ticket detail:', error.response.data);
    dispatch({
      type: LOAD_TICKET_DETAIL_FAIL,
    });
    throw error;
  }
}


export const uploadImage = async (imageUri) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const formData = new FormData();
    formData.append('images', {
      uri: imageUri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    const response = await axios.post(`${API_URL}/api/v1/file/upload/images`, formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data[0]; 
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};