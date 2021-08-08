import { SET_CONV } from "./actions.types";

export default (state, action) => {
  switch (action.type) {
    case SET_CONV:
      return action.payload == null
        ? { ...state, conversation: [] }
        : { ...state, conversation: action.payload };

    default:
      return state;
  }
};
