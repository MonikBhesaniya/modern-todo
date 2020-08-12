import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import task from "./task";

const rootReducer = combineReducers({
  alert,
  auth,
  task,
});

export default rootReducer;
