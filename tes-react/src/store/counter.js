const DEFAULT_STATE = {
  count: 1,
};

export const counterReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "INCREMENT_COUNT") {
    const duplicateState = { ...state };
    duplicateState.count += 1;
    return duplicateState;
  } else if (action.type === "DECREMENT_COUNT") {
    const duplicateState = { ...state };
    duplicateState.count -= 1;
    return duplicateState;
  } else if (action.type === "INPUT_COUNT") {
    const duplicateState = { ...state };
    duplicateState.count = action.payload.newCount;
    return duplicateState;
  }
  return state;
};
