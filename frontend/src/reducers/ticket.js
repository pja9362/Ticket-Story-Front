import {
    LOAD_MY_TICKETS_SUCCESS,
    LOAD_MY_TICKETS_FAIL,
    LOAD_TICKET_DETAIL_SUCCESS,
    LOAD_TICKET_DETAIL_FAIL,
    UPDATE_TICKET_SUCCESS,
    RESET_UPDATE_TICKET,
} from '../actions/ticket/types';

const initialState = {
    myTickets: [],
    selectedTicket: null,
    ticketUpdated: true,
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
        case LOAD_TICKET_DETAIL_SUCCESS:
            return {
                ...state,
                selectedTicket: payload,
            };
        case LOAD_TICKET_DETAIL_FAIL:
            return {
                ...state,
                selectedTicket: null,
            };
        case UPDATE_TICKET_SUCCESS:
            return {
                ...state,
                ticketUpdated: true, 
            };
        case RESET_UPDATE_TICKET:
            return {
                ...state,
                ticketUpdated: false,
            };
        default:
            return state;
    }
};

export default ticketReducer;