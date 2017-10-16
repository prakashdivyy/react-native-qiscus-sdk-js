
import type { Action } from './types';
export const SET_USER = 'SET_USER';
export const INIT_APP = 'INIT_APP';
export const CHAT_TARGET = 'CHAT_TARGET';
export const RECEIVE_NEW_MESSAGE = 'RECEIVE_NEW_MESSAGE';

export function initApp(qiscus: object) {
  return {
    type: INIT_APP,
    payload: qiscus,
  }
}

export function chatTarget(name: string) {
  return {
    type: CHAT_TARGET,
    payload: name,
  }
}

export function setUser(user:Object):Action {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function receiveNewMessage(message:Array<Object>):Action {
  return {
    type: RECEIVE_NEW_MESSAGE,
    payload: message,
  };
}
