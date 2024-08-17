import {
    LOAD_MY_STATISTICS_SUCCESS,
    LOAD_MY_STATISTICS_FAIL
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';
import { requestWithRetry } from '../auth/auth';

export const loadMyStatistics = () => async dispatch => {
    return requestWithRetry(async () => {
        const token = await AsyncStorage.getItem('accessToken');
        console.log("나의 통계 Token:", token)
        const response = await axios.get(
            `${API_URL}/api/v1/statistics/getBasicStatistics`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log("나의 통계 Response:", response.data)

        if (response.status == 200) {
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
    }).catch(error => {
        dispatch({
            type: LOAD_MY_STATISTICS_FAIL
        });
        return [];
    });
};
