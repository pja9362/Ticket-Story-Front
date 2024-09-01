import { combineReducers } from 'redux';
import authReducer from './auth';
import enrollTicketSearchReducer from './enrollTicketSearch';
import ticketReducer from './ticket';
import statisticsReducer from './statistics';
import overlayReducer from './overlaySlice';
import filterReducer from './filter';

const rootReducer = combineReducers({
  auth: authReducer,
  enrollTicketSearch: enrollTicketSearchReducer,
  ticket: ticketReducer,
  statistics: statisticsReducer,
  overlay: overlayReducer,
  filter: filterReducer,
});

export default rootReducer;
