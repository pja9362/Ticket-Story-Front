import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';
import {
  LOAD_MY_TICKETS_SUCCESS,
  LOAD_MY_TICKETS_FAIL,
  LOAD_TICKET_DETAIL_SUCCESS,
  LOAD_TICKET_DETAIL_FAIL,
  UPDATE_TICKET_SUCCESS,
  RESET_UPDATE_TICKET
} from './types';

// export const saveNewTicket = async (data) => {
  export const saveNewTicket = (data) => async dispatch => {
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

    if (response.data !== null) {
      dispatch({
        type: UPDATE_TICKET_SUCCESS,
      });
    }

    return response.data;
  } catch (error) {
    console.error('Error saving new ticket:', error);
    throw error;
  }
}


export const resetUpdateTicket = () => async dispatch => {
  dispatch({
    type: RESET_UPDATE_TICKET,
  })
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
    console.error('Error getting ticket detail:', error);
    throw error;
  }
}

// export const updateReview = async (reviewId, data) => {
  export const updateReview = (reviewId, data) => async dispatch =>{
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log('Access token:', accessToken);
    console.log('editReview-----------------', reviewId);
    console.log('Data-------------------', data);
    const response = await axios.patch(`${API_URL}/api/v1/reviews/updateReview`, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        // ticketId: ticketId
        reviewId: reviewId
      }
    });
    console.log('Update Review response:', response.data);

    if (response.data !== null) {
      dispatch({
        type: UPDATE_TICKET_SUCCESS,
      });
    }

    return response.data;
  } catch (error) {
    console.error('Error updating Review:', error);
    throw error;
  }
}

export const updateReviewImage = async (reviewId, data) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log('Access token:', accessToken);
    console.log('updateReviewImage-----------------', reviewId);
    console.log('Data-------------------', data);
    const response = await axios.patch(`${API_URL}/api/v1/reviews/updateSingleReviewImage`, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        reviewId: reviewId
      }
    });
    console.log('Update Review Image response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating Review Image:', error);
    throw error;
  }
}

// export const updateInfo = async (ticketId, data) => {
  export const updateInfo = (ticketId, data) => async dispatch => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log('Access token:', accessToken);
    console.log('editInfo-----------------', ticketId);
    console.log('Data-------------------', data);
    const response = await axios.patch(`${API_URL}/api/v1/ticket/updateTicket`, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        ticketId: ticketId
      }
    });
    console.log('Update Info response:', response.data);

    if (response.data !== null) {
      dispatch({
        type: UPDATE_TICKET_SUCCESS,
      });
    }

    return response.data;
  } catch (error) {
    console.error('Error updating Info:', error.response.data);
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

export const getMyTickets = (page, size, order, orderBy, category, callback) => async dispatch => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    
    if (accessToken === null) {
      return;
    }

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
          category: category,
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