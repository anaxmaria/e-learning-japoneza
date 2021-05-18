import axios from "axios";
import { setAlert } from "./alert";
import {
  ADD_COMMENT,
  COMMENT_ERROR,
} from "./types";


//add a comment to course
export const addComment = (courseId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/posts/comm/course/${courseId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment added", "success"));
  } catch (err) {
    dispatch({
      type: COMMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
