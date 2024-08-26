import {
    LOAD_MY_STATISTICS_SUCCESS,
    LOAD_MY_STATISTICS_FAIL,
    LOAD_MOVIE_STATS_SUCCESS,
    LOAD_MOVIE_STATS_FAIL,
    LOAD_PERFORMANCE_STATS_SUCCESS,
    LOAD_PERFORMANCE_STATS_FAIL,
    LOAD_SPORTS_STATS_SUCCESS,
    LOAD_SPORTS_STATS_FAIL,
} from '../actions/statistics/types';

const initialState = {
    basicStats: null,
    sportsStats: null,
    performanceStats: null,
    movieStats: null,
};

const statisticsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOAD_MY_STATISTICS_SUCCESS:
            return {
                ...state,
                basicStats: payload,
            };
        case LOAD_MY_STATISTICS_FAIL:
            return {
                ...state,
                basicStats: null,
            };
        case LOAD_MOVIE_STATS_SUCCESS:
            return {
                ...state,
                movieStats: payload,
            };
        case LOAD_MOVIE_STATS_FAIL:
            return {
                ...state,
                movieStats: null,
            };
        case LOAD_PERFORMANCE_STATS_SUCCESS:
            return {
                ...state,
                performanceStats: payload,
            };
        case LOAD_PERFORMANCE_STATS_FAIL:
            return {
                ...state,
                performanceStats: null,
            };
        case LOAD_SPORTS_STATS_SUCCESS:
            return {
                ...state,
                sportsStats: payload,
            };
        case LOAD_SPORTS_STATS_FAIL:
            return {
                ...state,
                sportsStats: null,
            };
        default:
            return state;
    }
}

export default statisticsReducer;


