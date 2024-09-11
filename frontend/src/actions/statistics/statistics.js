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
import { refreshTokens } from '../auth/auth';

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
    refreshSubscribers.push(callback);
};

const onRefreshed = (newAccessToken) => {
    refreshSubscribers.map((callback) => callback(newAccessToken));
    refreshSubscribers = [];
};

export const requestWithRetry = async (callback) => {
    try {
        const response = await callback();
        return response;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            if (!isRefreshing) {
                isRefreshing = true;
                console.log("토큰 만료 403 에러 발생, refresh token 요청해야 함");

                const newTokens = await refreshTokens();
                isRefreshing = false;

                if (newTokens) {
                    onRefreshed(newTokens.accessToken);
                    return callback();
                } else {
                    throw new Error('Session expired. Please log in again.');
                }
            } else {
                // 이미 토큰 갱신 중인 경우, 갱신 완료 후 재시도
                return new Promise((resolve) => {
                    subscribeTokenRefresh((newAccessToken) => {
                        resolve(callback());
                    });
                });
            }
        } else {
            throw error;
        }
    }
};

export const loadMyStatistics = (year) => async dispatch => {
    return requestWithRetry(async () => {
        console.log("LOAD MY STATS")
        const token = await AsyncStorage.getItem('accessToken');
        
        let url = `${API_URL}/api/v1/statistics/getBasicStatistics`;
        
        if (year !== 'everything') {
            url += `?year=${year}`;
        }

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

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

export const loadSportsStats = (year) => async dispatch => {
    return requestWithRetry(async () => {
        console.log("LOAD SPORTS STATS")
        const token = await AsyncStorage.getItem('accessToken');

        let url = `${API_URL}/api/v1/statistics/getSportsStatistics`;
        
        if (year !== 'everything') {
            url += `?year=${year}`;
        }

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

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

export const loadPerformanceStats = (year) => async dispatch => {
    return requestWithRetry(async () => {
        console.log("LOAD PERFORMANCE STATS")
        const token = await AsyncStorage.getItem('accessToken');

        let url = `${API_URL}/api/v1/statistics/getPerformanceStatistics`;
        
        if (year !== 'everything') {
            url += `?year=${year}`;
        }

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

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

export const loadMovieStats = (year) => async dispatch => {
    return requestWithRetry(async () => {
        console.log("LOAD MOVIE STATS")
        const token = await AsyncStorage.getItem('accessToken');
        
        let url = `${API_URL}/api/v1/statistics/getMovieStatistics`;
        
        if (year !== 'everything') {
            url += `?year=${year}`;
        }

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

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