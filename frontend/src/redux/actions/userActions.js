// Action Types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_USER_DATA = "SET_USER_DATA";

// Action Creators
export const login = (credentials) => ({
  type: LOGIN,
  payload: credentials,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});
