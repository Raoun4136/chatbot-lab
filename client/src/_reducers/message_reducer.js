import { INIT_MESSAGE, SAVE_MESSAGE } from '../_actions/types';

const messageReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case SAVE_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.payload),
      };
    case INIT_MESSAGE:
      return { ...state, messages: [] };
    default:
      return state;
  }
};

export default messageReducer;
