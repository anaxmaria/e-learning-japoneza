import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import course from "./course";
import quizz from "./quizz";
import assignment from "./assignment";
export default combineReducers({
  alert,
  auth,
  course,
  quizz,
  assignment
});
