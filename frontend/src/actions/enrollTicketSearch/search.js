import {
    SEARCH_CONTENT_SUCCESS,
    SEARCH_CONTENT_FAIL,
    SEARCH_LOCATION_SUCCESS,
    SEARCH_LOCATION_FAIL
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'https://ticketstory.shop/api/v1/search';

export const searchContent = (keyword, date, category, registerBy) => async dispatch => {
    const token = await AsyncStorage.getItem('accessToken');
    console.log('Token:', token);

    try {
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
        console.log("RESPONSE", response.data);

        if(response.status == 200) {
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
    } catch (error) {
        dispatch({
            type: SEARCH_CONTENT_FAIL
        });
        return [];
    }
};

export const searchLocation = (keyword) => async dispatch => {
    const token = await AsyncStorage.getItem('accessToken');

    console.log("장소 검색", keyword)

    try {
        const response = await axios.get(
            `${API_URL}/autoCompleteLocation`,
            {
                params: {
                    keyword: keyword
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );          
        console.log("RESPONSE", response.data);

        if(response.status == 200) {
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
    } catch (error) {
        dispatch({
            type: SEARCH_LOCATION_FAIL
        });
        return [];
    }
}
