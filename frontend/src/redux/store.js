// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "./reducers/resumeReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    resume: resumeReducer, // Add the resume reducer to the store
    user: userReducer,
  },
});

export default store;
