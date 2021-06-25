import {combineReducers} from "redux";

import quizReducer from "./quizReduce";

export default combineReducers({
  quiz: quizReducer,
});
