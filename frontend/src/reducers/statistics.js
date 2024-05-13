import {
    LOAD_MY_STATISTICS_SUCCESS,
    LOAD_MY_STATISTICS_FAIL
} from '../actions/statistics/types';

const initialState = {
    myStatistics: null,
};

const statisticsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOAD_MY_STATISTICS_SUCCESS:
            return {
                ...state,
                myStatistics: payload,
            };
        case LOAD_MY_STATISTICS_FAIL:
            return {
                ...state,
                myStatistics: null,
            };
        default:
            return state;
    }
}

export default statisticsReducer;


