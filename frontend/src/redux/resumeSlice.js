// redux/resumeSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the resume
const initialState = {
  name: "",
  email: "",
  phone: "",
  summary: "",
  experience: "",
  education: "",
};

// Create a slice of state for managing resume data
const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    // Action to update the resume field
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    // Action to reset the resume data
    resetResume: () => initialState,
  },
});

// Export actions from the slice
export const { updateField, resetResume } = resumeSlice.actions;

// Export the reducer to be included in the store
export default resumeSlice.reducer;
