import {
  ADD_COURSE,
  GET_COURSES,
  COURSES_ERROR,
  GET_FILTERED_COURSE,
  GET_CURRENT_COURSE,
  GET_COURSE_BY_AUTHOR,
  DELETE_COURSE,
  UPDATE_COURSE,
  GET_COURSE_BY_ID,
  ADD_MY_COURSE,
  GET_COURSE_BY_STUDENT_NAME,
} from "../actions/types";

const initialState = {
  course: null,
  myCourse: null,
  courses: [],
  coursesAdded: [],
  myCourses: [],
  loading: true,
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_MY_COURSE:
      return {
        ...state,
        loading: false,
        myCourse: payload,
      };
    case ADD_COURSE:
      return {
        ...state,
        loading: false,
        course: payload,
      };
    case GET_COURSE_BY_ID:
    case GET_FILTERED_COURSE:
    case GET_CURRENT_COURSE:
      return {
        ...state,
        loading: false,
        course: payload,
      };

    case GET_COURSE_BY_AUTHOR:
      return {
        ...state,
        loading: false,
        coursesAdded: payload,
      };
    case GET_COURSE_BY_STUDENT_NAME:
      return {
        ...state,
        loading: false,
        myCourses: payload,
      };
    case DELETE_COURSE:
    case UPDATE_COURSE:
      return {
        ...state,
        loading: false,
      };
    case GET_COURSES:
      return {
        ...state,
        loading: false,
        courses: payload,
      };
    case COURSES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
