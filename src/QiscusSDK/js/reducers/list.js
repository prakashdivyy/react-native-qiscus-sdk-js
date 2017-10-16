import type { Action } from "../actions/types";
import { SET_INDEX } from "../actions/list";

export type State = {
  list: Array<any>;
};
const initialState = {
  list: [
        {
           "name":{
              "title":"mr",
              "first":"ali",
              "last":"süleymanoğlu"
           },
           "email":"ali.süleymanoğlu@example.com",
           "picture":{
              "large":"https://randomuser.me/api/portraits/men/44.jpg",
              "medium":"https://randomuser.me/api/portraits/med/men/44.jpg",
              "thumbnail":"https://randomuser.me/api/portraits/thumb/men/44.jpg"
           }
        },
        {
           "name":{
              "title":"mrs",
              "first":"katherine",
              "last":"armstrong"
           },
           "email":"katherine.armstrong@example.com",
           "picture":{
              "large":"https://randomuser.me/api/portraits/women/10.jpg",
              "medium":"https://randomuser.me/api/portraits/med/women/10.jpg",
              "thumbnail":"https://randomuser.me/api/portraits/thumb/women/10.jpg"
           }
        },
        {
           "name":{
              "title":"mr",
              "first":"santiago",
              "last":"vargas"
           },
           "email":"santiago.vargas@example.com",
           "picture":{
              "large":"https://randomuser.me/api/portraits/men/94.jpg",
              "medium":"https://randomuser.me/api/portraits/med/men/94.jpg",
              "thumbnail":"https://randomuser.me/api/portraits/thumb/men/94.jpg"
           }
        },
        {
           "name":{
              "title":"miss",
              "first":"mia",
              "last":"jimenez"
           },
           "email":"mia.jimenez@example.com",
           "picture":{
              "large":"https://randomuser.me/api/portraits/women/46.jpg",
              "medium":"https://randomuser.me/api/portraits/med/women/46.jpg",
              "thumbnail":"https://randomuser.me/api/portraits/thumb/women/46.jpg"
           }
        },
        {
           "name":{
              "title":"ms",
              "first":"arlinda",
              "last":"freitas"
           },
           "email":"arlinda.freitas@example.com",
           "picture":{
              "large":"https://randomuser.me/api/portraits/women/76.jpg",
              "medium":"https://randomuser.me/api/portraits/med/women/76.jpg",
              "thumbnail":"https://randomuser.me/api/portraits/thumb/women/76.jpg"
           }
        }
     ],
  selectedIndex: undefined
};

export default function(state: State = initialState, action: Action): State {
  if (action.type === SET_INDEX) {
    return {
      ...state,
      selectedIndex: action.payload
    };
  }
  return state;
}
