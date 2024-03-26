import {
    SEARCH_CONTENT_SUCCESS,
    SEARCH_CONTENT_FAIL,
    SEARCH_LOCATION_SUCCESS,
    SEARCH_LOCATION_FAIL
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://ticketstory.shop/api/v1/search/autoComplete';

export const searchContent = (keyword, date, category, registerBy) => async dispatch => {
    const token = await AsyncStorage.getItem('accessToken');
    console.log('Token:', token);
    console.log('Search content request:',token, keyword, date, category, registerBy);


    try {
        console.log("요청 시작! TRY 구문 실행!");
        const response = await axios.get(
            `${API_URL}`,
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
        console.log('Search content response:', response.data);

        dispatch({
            type: SEARCH_CONTENT_SUCCESS,
            payload: response.data 
        });

        return response.data;
    } catch (error) {
        dispatch({
            type: SEARCH_CONTENT_FAIL
        });
    }
};
