import {
    LOAD_MY_STATISTICS_SUCCESS,
    LOAD_MY_STATISTICS_FAIL,
    LOAD_SPORTS_STATS_SUCCESS,
    LOAD_SPORTS_STATS_FAIL,
    LOAD_PERFORMANCE_STATS_SUCCESS,
    LOAD_PERFORMANCE_STATS_FAIL,
    LOAD_MOVIE_STATS_SUCCESS,
    LOAD_MOVIE_STATS_FAIL,
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';
import { requestWithRetry } from '../auth/auth';

export const loadMyStatistics = () => async dispatch => {
    return requestWithRetry(async () => {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(
            `${API_URL}/api/v1/statistics/getBasicStatistics`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        if (response.status == 200) {
            dispatch({
                type: LOAD_MY_STATISTICS_SUCCESS,
                payload: response.data
            });
            // console.log("전체 통계", response.data);
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

export const loadSportsStats = () => async dispatch => {
    return requestWithRetry(async () => {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(
            `${API_URL}/api/v1/statistics/getSportsStatistics`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (response.status == 200) {
            dispatch({
                type: LOAD_SPORTS_STATS_SUCCESS,
                payload: response.data
            });
            // console.log("스포츠 통계", response.data);
            return response.data;
        } else {
            dispatch({
                type: LOAD_SPORTS_STATS_FAIL
            });
            return [];
        }
    }).catch(error => {
        dispatch({
            type: LOAD_SPORTS_STATS_FAIL
        });
        return [];
    });
}

export const loadPerformanceStats = () => async dispatch => {
    return requestWithRetry(async () => {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(
            `${API_URL}/api/v1/statistics/getPerformanceStatistics`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (response.status == 200) {
            dispatch({
                type: LOAD_PERFORMANCE_STATS_SUCCESS,
                payload: response.data
            });
            // console.log("공연 통계", response.data);
            return response.data;
        } else {
            dispatch({
                type: LOAD_PERFORMANCE_STATS_FAIL
            });
            return [];
        }
    }).catch(error => {
        dispatch({
            type: LOAD_PERFORMANCE_STATS_FAIL
        });
        return [];
    });
}

export const loadMovieStats = () => async dispatch => {
    return requestWithRetry(async () => {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await axios.get(
            `${API_URL}/api/v1/statistics/getMovieStatistics`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (response.status == 200) {
            dispatch({
                type: LOAD_MOVIE_STATS_SUCCESS,
                payload: response.data
            });
            // console.log("영화 통계", response.data);
            return response.data;
        } else {
            dispatch({
                type: LOAD_MOVIE_STATS_FAIL
            });
            return [];
        }
    }).catch(error => {
        dispatch({
            type: LOAD_MOVIE_STATS_FAIL
        });
        return [];
    });
}