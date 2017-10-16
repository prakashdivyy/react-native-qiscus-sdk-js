import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import drawer from "./drawer";
import {user, initApp, chatTarget, receiveNewMessage} from "./user";
import list from "./list";

export default combineReducers({
  form: formReducer,
  drawer,
  user,
  list,
  initApp,
  chatTarget,
  receiveNewMessage,
});
