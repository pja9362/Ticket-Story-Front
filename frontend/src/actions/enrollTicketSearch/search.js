import {
    SEARCH_CONTENT_SUCCESS,
    SEARCH_CONTENT_FAIL,
    SEARCH_LOCATION_SUCCESS,
    SEARCH_LOCATION_FAIL,
    SEARCH_CONTENT_CLEAR,
    SEARCH_LOCATION_CLEAR
} from './types';
import { requestWithRetry } from '../auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'https://ticketstory.shop/api/v1/search';

export const searchContent = (keyword, date, category, registerBy) => async dispatch => {
    return requestWithRetry(async () => {
        const token = await AsyncStorage.getItem('accessToken');
        console.log('콘텐츠 검색 Token:', token);

        const response = await axios.get(
            `${API_URL}/autoComplete`,
            {
                params: {
                    keyword: keyword,
                    date: date,
                    category: category,
                    registerBy: registerBy
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );          
        if (response.status == 200) {
            dispatch({
                type: SEARCH_CONTENT_SUCCESS,
                payload: response.data 
            });
            return response.data;
        } else {
            dispatch({
                type: SEARCH_CONTENT_FAIL
            });
            return [];
        }
    });
};

export const searchLocation = (keyword, category, categoryDetail) => async dispatch => {
    return requestWithRetry(async () => {
        const token = await AsyncStorage.getItem('accessToken');
        console.log("장소 검색 Token:", token)
        
        const response = await axios.get(
            // `${API_URL}/autoCompleteLocation`,
            `${API_URL}/autoCompleteLocationWithCategory`,
            {
                params: {
                    keyword: keyword,
                    category: category,
                    categoryDetail : categoryDetail,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );          

        if (response.status == 200) {
            dispatch({
                type: SEARCH_LOCATION_SUCCESS,
                payload: response.data 
            });
            return response.data;
        } else {
            dispatch({
                type: SEARCH_LOCATION_FAIL
            });
            return [];
        }
    });
};


export const clearContent = () => async dispatch => {
    dispatch({
        type: SEARCH_CONTENT_CLEAR  
    });
}

export const clearLocation = () => async dispatch => {
    dispatch({
        type: SEARCH_LOCATION_CLEAR  
    });
}
