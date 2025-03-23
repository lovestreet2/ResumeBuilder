import { LOGIN, LOGOUT, SET_USER_DATA } from "../actions/userActions";

// Initial state for the user
const initialState = {
  isAuthenticated: false,
  userData: null,
};

// User reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        userData: null,
      };
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
