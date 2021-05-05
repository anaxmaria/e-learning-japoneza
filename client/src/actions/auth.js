import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  REGISTER_STUDENT_SUCCESS,
  REGISTER_STUDENT_FAIL,
  STUDENT_LOADED,
  STUDENT_AUTH_ERROR,
  LOGIN_STUDENT_SUCCESS,
  LOGIN_STUDENT_FAIL,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";


//Load Student

export const loadStudent = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/studentsAuth");
    console.log(res.data);
    await dispatch({
      type: STUDENT_LOADED,
      payload: res.data,
    });
    console.log("abc1-2");
  } catch (err) {
    dispatch({
      type: STUDENT_AUTH_ERROR,
    });
    console.log("Here");
  }
};



//Register a student
export const registerStudent = ({ name, email, password, status }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password, status });
  try {
    const res = await axios.post("/api/students", body, config);

    dispatch({
      type: REGISTER_STUDENT_SUCCESS,
      payload: res.data,
    });
    dispatch(loadStudent());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_STUDENT_FAIL,
    });
  }
};

//Login Student
export const loginStudent = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/studentsAuth", body, config);

    
      await dispatch({
        type: LOGIN_STUDENT_SUCCESS,
        payload: res.data,
      });
      
      await dispatch(loadStudent());
      console.log("abc");
    
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_STUDENT_FAIL,
    });
  }
};

//Logout/ Clear profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
