import {
    LOAD_MY_TICKETS_SUCCESS,
    LOAD_MY_TICKETS_FAIL,
} from '../actions/ticket/types';

const initialState = {
    myTickets: [],
};

const ticketReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOAD_MY_TICKETS_SUCCESS:
            return {
                ...state,
                myTickets: payload,
            };
        case LOAD_MY_TICKETS_FAIL:
            return {
                ...state,
                myTickets: [],
            };
        default:
            return state;
    }
};

export default ticketReducer;