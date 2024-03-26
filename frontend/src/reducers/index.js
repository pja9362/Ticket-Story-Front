import { combineReducers } from "redux";
import authReducer from "./auth";
import enrollTicketSearchReducer from "./enrollTicketSearch";

export default combineReducers({
    auth: authReducer,
    enrollTicketSearch: enrollTicketSearchReducer
});