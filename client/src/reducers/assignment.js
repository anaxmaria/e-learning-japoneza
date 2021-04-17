import {
  ADD_ASSIGNMENT,
  GET_ASSIGNMENT_BY_COURSE_NAME,
  GET_ASSIGNMENT_BY_ID,
  GET_ASSIGNMENT_BY_AUTHOR,
  DELETE_ASSIGNMENT,
  GET_ALL_ASSIGNMENTS,
  ASSIGNMENT_ERROR
} from "../actions/types";

const initialState = {
  assignment: null,
  assignments: [],
  currentAssignment: null,
  assignmentsAdded: [],
  loading: true,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_ASSIGNMENT:
      return {
        ...state,
        assignment: payload,
        loading: false,
      };
    case GET_ASSIGNMENT_BY_AUTHOR:
      return {
        ...state,
        assignmentsAdded: payload,
        loading: false,
      };
    case GET_ASSIGNMENT_BY_COURSE_NAME:
      return {
        ...state,
        assignments: payload,
        loading: false,
      };
    case GET_ASSIGNMENT_BY_ID:
      return {
        ...state,
        currentAssignment: payload,
        loading: false,
      };
    case GET_ALL_ASSIGNMENTS:
      return {
        ...state,
        assignments: payload,
        loading: false,
      };
    case ASSIGNMENT_ERROR:
      return {
        ...state,
        loading: false,
      };
    case DELETE_ASSIGNMENT:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
