import axios from "axios";
import { setAlert } from "./alert";

import {
  ADD_COURSE,
  GET_COURSES,
  COURSES_ERROR,
  GET_FILTERED_COURSE,
  ADD_QUIZZ,
  QUIZZES_ERROR,
  ADD_QUESTION,
  QUESTION_ERROR,
  GET_QUIZZES,
  GET_CURRENT_QUIZZ,
  GET_CURRENT_COURSE,
  GET_COURSE_BY_AUTHOR,
  DELETE_COURSE,
  DELETE_ERROR,
  UPDATE_COURSE,
  GET_COURSE_BY_ID,
  GET_QUIZZ_BY_COURSE_NAME,
  ADD_ASSIGNMENT,
  GET_ASSIGNMENT_BY_COURSE_NAME,
  GET_ASSIGNMENT_BY_ID,
  GET_ALL_ASSIGNMENTS,
  ASSIGNMENT_ERROR,
  ADD_MY_COURSE,
  GET_COURSE_BY_STUDENT_NAME,
  ADD_MY_QUIZ_RESULT,
  GET_QUIZ_BY_STUDENT_NAME,
  GET_QUIZZ_BY_AUTHOR,
  GET_ASSIGNMENT_BY_AUTHOR,
  DELETE_QUIZZ,
  DELETE_ASSIGNMENT,
} from "./types";

//Add course
export const addCourse = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    //TODO: pt incarcare imagine scoate linia urm
    const body = {"name": formData.get("name"), "description": formData.get("description")}
    const res = await axios.post("api/courses", body);
    dispatch({
      type: ADD_COURSE,
      payload: res.data,
    });
    dispatch(setAlert("Course Added", "success"));
    history.push("/dashboard");
  } catch (err) {
    dispatch();
  }
};

//Get all courses
export const getAllCourses = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/courses");

    dispatch({
      type: GET_COURSES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Get filtered courses
export const getFilteredCourse = (enteredFilter) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/courses/${enteredFilter}`);
    dispatch({
      type: GET_FILTERED_COURSE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Get  course by id
export const getCourseById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/courses/course/${id}`);
    dispatch({
      type: GET_COURSE_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Get course by author
export const getCourseByAuthor = (enteredFilter) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/added/${enteredFilter}`);
    dispatch({
      type: GET_COURSE_BY_AUTHOR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Delete course
export const deleteCourse = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/courses/${id}`);
    dispatch({
      type: DELETE_COURSE,
      payload: res.data,
    });

    dispatch(setAlert("Course  Removed", "success"));
  } catch (err) {
    dispatch({
      type: DELETE_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Update course
export const updateCourse = (id, formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.put(`/api/courses/${id}`, formData, config);
    dispatch({
      type: UPDATE_COURSE,
      payload: res.data,
    });
    dispatch(setAlert("Course Updated", "success"));
    history.push("/dashboard");
  } catch (err) {
    dispatch();
  }
};

//Add a quizz
export const addQuizz = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/quizzes", formData, config);
    dispatch({
      type: ADD_QUIZZ,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: QUIZZES_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Add a question to quizz
export const addQuestion = (quizzId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `/api/quizzes/question/${quizzId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_QUESTION,
      payload: res.data,
    });
    dispatch(setAlert("Question Added", "success"));
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { status: err.response.status },
    });
  }
};
//Get quizzes
export const getQuizzes = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/quizzes");
    dispatch({
      type: GET_QUIZZES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: QUIZZES_ERROR,
      payload: { status: err.response.status },
    });
  }
};
//Get quizzes by course name
export const getQuizzesByCourseName = (name) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/quizzes/quiz/${name}`);
    dispatch({
      type: GET_QUIZZES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_QUIZZ_BY_COURSE_NAME,
      payload: { status: err.response.status },
    });
  }
};

//Get current quizz by id
export const getCurrentQuizzById = (quizzId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/quizzes/${quizzId}`);
    dispatch({
      type: GET_CURRENT_QUIZZ,
      payload: res.data,
    });
  } catch (err) {
    dispatch();
  }
};

//Get current course by id
export const getCurrentCourseById = (courseId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/courses/course/${courseId}`);
    dispatch({
      type: GET_CURRENT_COURSE,
      payload: res.data,
    });
  } catch (err) {
    dispatch();
  }
};

//Add assignment
export const addAssignment = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/assignments", formData, config);
    dispatch({
      type: ADD_ASSIGNMENT,
      payload: res.data,
    });
    dispatch(setAlert("Assignment Added", "success"));
  } catch (err) {
    dispatch({
      type: QUIZZES_ERROR,
      payload: { status: err.response.status },
    });
  }
};
//Get assignments by course name
export const getAssignmentsByCourseName = (name) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/assignments/assignment/${name}`);
    dispatch({
      type: GET_ASSIGNMENT_BY_COURSE_NAME,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_QUIZZ_BY_COURSE_NAME,
      payload: { status: err.response.status },
    });
  }
};

//Get current assignment by id
export const getCurrentAssignmentById = (assignmentId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/assignments/${assignmentId}`);
    dispatch({
      type: GET_ASSIGNMENT_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch();
  }
};

//Get quizzes
export const getAllAssignments = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/assignments");
    dispatch({
      type: GET_ALL_ASSIGNMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ASSIGNMENT_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Add a view course
export const addMyCourse = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/mycourses", formData, config);
    dispatch({
      type: ADD_MY_COURSE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { status: err.response.status },
    });
  }
};
//Get course by student name
export const getCourseByStudent = (enteredFilter) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/mycourses/${enteredFilter}`);
    dispatch({
      type: GET_COURSE_BY_STUDENT_NAME,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Add a my quiz result
export const addMyQuizResult = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/myquizresults", formData, config);
    dispatch({
      type: ADD_MY_QUIZ_RESULT,
      payload: res.data,
    });
    dispatch(setAlert("Result saved", "success"));
  } catch (err) {
    dispatch();
  }
};

//Get quiz by student name
export const getQuizzResultByStudent = (enteredFilter) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/myquizresults/${enteredFilter}`);
    dispatch({
      type: GET_QUIZ_BY_STUDENT_NAME,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Get quizz by author
export const getQuizzByAuthor = (enteredFilter) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/addedQuizzes/${enteredFilter}`);
    dispatch({
      type: GET_QUIZZ_BY_AUTHOR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Get assignment by author
export const getAssignmentByAuthor = (enteredFilter) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/addedAssignments/${enteredFilter}`);
    dispatch({
      type: GET_ASSIGNMENT_BY_AUTHOR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Delete quizz
export const deleteQuizz = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/quizzes/${id}`);
    dispatch({
      type: DELETE_QUIZZ,
      payload: res.data,
    });

    dispatch(setAlert("Quizz  Removed", "success"));
  } catch (err) {
    dispatch({
      type: DELETE_ERROR,
      payload: { status: err.response.status },
    });
  }
};

//Delete assignment
export const deleteAssignment = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/assignments/${id}`);
    dispatch({
      type: DELETE_ASSIGNMENT,
      payload: res.data,
    });

    dispatch(setAlert("Assignment  Removed", "success"));
  } catch (err) {
    dispatch({
      type: DELETE_ERROR,
      payload: { status: err.response.status },
    });
  }
};
