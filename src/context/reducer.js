import { SET_MSG, SET_USERS } from "./actions.types";

export default (state, action) => {
  switch (action.type) {
    case SET_MSG:
      return action.payload == null
        ? { ...state, message: [] }
        : { ...state, message: action.payload };
    case SET_USERS:
      return action.payload == null
        ? { ...state, activeUsers: [] }
        : { ...state, activeUsers: action.payload };
    default:
      return state;
  }
};
