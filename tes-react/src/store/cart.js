const DEFAULT_STATE = {
  items: [],
};

export const cartReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "CART_GET") {
    const duplicateState = { ...state };
    duplicateState.items = action.payload;
    return duplicateState;
  } else if (action.type === "CART_REMOVE") {
    const duplicateState = { ...state };
    duplicateState.items = state.items.filter(
      (item) => item.cartId !== action.payload.cartId
    );
  }

  return state;
};
