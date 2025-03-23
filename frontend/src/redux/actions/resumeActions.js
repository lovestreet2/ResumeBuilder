// Action Types
export const UPDATE_FIELD = "UPDATE_FIELD";
export const RESET_RESUME = "RESET_RESUME";

// Action Creators
export const updateField = (field, value) => ({
  type: UPDATE_FIELD,
  payload: { field, value },
});

export const resetResume = () => ({
  type: RESET_RESUME,
});
