import {
    LOAD_MY_STATISTICS_SUCCESS,
    LOAD_MY_STATISTICS_FAIL
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';

export const loadMyStatistics = () => async dispatch => {
    const token = await AsyncStorage.getItem('accessToken');

    try {
        const response = await axios.get(
            `${API_URL}/api/v1/statistics/getBasicStatistics`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if(response.status == 200) {
            console.log("RESPONSE", response.data);
            dispatch({
                type: LOAD_MY_STATISTICS_SUCCESS,
                payload: response.data 
            });
            return response.data;
        } else {
            dispatch({
                type: LOAD_MY_STATISTICS_FAIL
            });
            return [];
        }
    } catch (error) {
        dispatch({
            type: LOAD_MY_STATISTICS_FAIL
        });
        return [];
    }
}