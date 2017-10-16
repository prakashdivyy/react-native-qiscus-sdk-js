
export type Action =
  { type: 'PUSH_NEW_ROUTE', route: string }
    | { type: 'POP_ROUTE' }
    | { type: 'POP_TO_ROUTE', route: string }
    | { type: 'REPLACE_ROUTE', route: string }
    | { type: 'REPLACE_OR_PUSH_ROUTE', route: string }
    | { type: 'OPEN_DRAWER'}
    | { type: 'CLOSE_DRAWER'}
    | { type: 'SET_USER', user: Object}
    | { type: 'INIT_APP', qiscus: Object}
    | { type: 'CHAT_TARGET', name: string}
    | { type: 'RECEIVE_NEW_MESSAGE', message: Array<Object>}
    | { type: 'SET_LIST', list: string}

export type Dispatch = (action:Action | Array<Action>) => any;
export type GetState = () => Object;
export type PromiseAction = Promise<Action>;
