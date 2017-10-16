
import type { Action } from '../actions/types';
import { SET_USER, INIT_APP, CHAT_TARGET, RECEIVE_NEW_MESSAGE } from '../actions/user';

export type State = {
    user: Object
}

const initialState = {
  user: {},
};
const initialStateQiscus = {
  qiscus: null,
};
const initialStateChatTarget = {
  name: null,
};
const initialStateNewMessage = {
  message: [],
};

export function user(state:State = initialState, action:Action): State {
  if (action.type === SET_USER) {
    return {
      ...state,
      user: action.payload,
    };
  }
  return state;
}
export function initApp(state:State = initialStateQiscus, action:Action): State {
  if (action.type === INIT_APP) {
    return {
      ...state,
      qiscus: action.payload,
    };
  }
  return state;
}
export function chatTarget(state:State = initialStateChatTarget, action:Action): State {
  if (action.type === CHAT_TARGET) {
    return {
      ...state,
      name: action.payload,
    };
  }
  return state;
}
export function receiveNewMessage(state:State = initialStateNewMessage, action:Action): State {
  if (action.type === RECEIVE_NEW_MESSAGE) {
    return {
      ...state,
      message: action.payload,
    };
  }
  return state;
}
