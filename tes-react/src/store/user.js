const DEFAULT_STATE = {
  username: "",
  id: "",
  role: "",
};

export const userReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "USER_LOGIN") {
    const duplicateState = { ...state };
    duplicateState.username = action.payload.username;
    duplicateState.id = action.payload.id;
    duplicateState.role = action.payload.role;

    return duplicateState;
  } else if (action.type === "USER_LOGOUT") {
    return DEFAULT_STATE;
  }
  return state;
};
