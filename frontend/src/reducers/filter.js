import { SET_DEFAULT_ORDER } from "../actions/ticket/types";

const initialState = {
    defaultOrder: 'everything',
};

const filterReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case SET_DEFAULT_ORDER:
        return {
          ...state,
          defaultOrder: payload,
    };
      default:
        return state;
    }
};
  
export default filterReducer;