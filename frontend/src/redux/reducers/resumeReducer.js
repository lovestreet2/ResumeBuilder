import { UPDATE_FIELD, RESET_RESUME } from "../actions/resumeActions";

// Initial state for the resume
const initialState = {
  name: "",
  email: "",
  phone: "",
  summary: "",
  experience: "",
  education: "",
};

// Resume reducer
const resumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIELD:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case RESET_RESUME:
      return initialState;
    default:
      return state;
  }
};

export default resumeReducer;
