import {
    SEARCH_CONTENT_SUCCESS,
    SEARCH_CONTENT_FAIL,
    SEARCH_LOCATION_SUCCESS,
    SEARCH_LOCATION_FAIL,
    SEARCH_CONTENT_CLEAR,
    SEARCH_LOCATION_CLEAR
} from '../actions/enrollTicketSearch/types';

const initialState = {
    contentLists: [],
    locationLists: []
};

const enrollTicketSearchReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SEARCH_CONTENT_SUCCESS:
            return {
                ...state,
                contentLists: payload,
            };
        case SEARCH_CONTENT_FAIL:
            return {
                ...state,
                contentLists: [],
            };
        case SEARCH_LOCATION_SUCCESS:
            return {
                ...state,
                locationLists: payload,
            };
        case SEARCH_LOCATION_FAIL:
            return {
                ...state,
                locationLists: [],
            };
        case SEARCH_CONTENT_CLEAR:
            return {
                ...state,
                contentLists: [],
            };
        case SEARCH_LOCATION_CLEAR:
            return {
                ...state,
                locationLists: [],
            };
        default:
            return state;
    }
}

export default enrollTicketSearchReducer;