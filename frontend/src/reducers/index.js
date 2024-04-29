import { combineReducers } from "redux";
import authReducer from "./auth";
import enrollTicketSearchReducer from "./enrollTicketSearch";
import ticketReducer from "./ticket";

export default combineReducers({
    auth: authReducer,
    enrollTicketSearch: enrollTicketSearchReducer,
    ticket: ticketReducer
});