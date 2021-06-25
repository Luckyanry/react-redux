import {combineReducers} from "redux";

import createReducer from "./createReducer";
import quizReducer from "./quizReducer";

export default combineReducers({
  quiz: quizReducer,
  create: createReducer,
});
