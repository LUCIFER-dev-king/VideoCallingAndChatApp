import {
  SET_MSG,
  SET_USERS,
  SET_CONVERSATION,
  SET_CURRENT_CONVERSATION,
} from "./actions.types";

export default (state, action) => {
  switch (action.type) {
    case SET_MSG:
      return action.payload == null
        ? { ...state, message: [] }
        : { ...state, message: action.payload };
    case SET_CONVERSATION:
      return action.payload == null
        ? { ...state, conv: [] }
        : { ...state, conv: action.payload };
    case SET_CURRENT_CONVERSATION:
      return action.payload == null
        ? { ...state, currentConversation: {} }
        : { ...state, currentConversation: action.payload };
    case SET_USERS:
      return action.payload == null
        ? { ...state, activeUsers: [] }
        : { ...state, activeUsers: action.payload };
    default:
      return state;
  }
};
