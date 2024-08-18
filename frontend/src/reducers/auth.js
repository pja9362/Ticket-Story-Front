import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
} from '../actions/auth/types';

const initialState = {
    isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            };
        case REFRESH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            };
        case REFRESH_FAIL:
            return {
                ...state,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default authReducer;
