import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentCourseById } from "../../actions/profile";
import { Link } from "react-router-dom";
const StartCourse = ({ match, getCurrentCourseById, course }) => {
  useEffect(() => {
    getCurrentCourseById(match.params.id);
    console.log("useEffect");
  }, [getCurrentCourseById, match.params.id]);
  return (
    <Fragment>
      <div className="courseTitleContainer">{course && course.name}</div>

      <div className="courseTitleContainer">
        {/*video was here*/}
        <div className="myText">
          <br />
          If you want to practice what you've learned in this course solve the
          quizzes and assignments below!
        </div>
        <div>
          <Link
            to={"/student/quizzes"}
            className="btn btn-black btn-lg btn-block"
          >
            Quizzes
          </Link>
          <Link
            to={"/student/assignments-list"}
            className="btn btn-black btn-lg btn-block"
          >
            Assignments
          </Link>
        </div>
        <br />
      </div>
    </Fragment>
  );
};

StartCourse.propTypes = {
  getCurrentCourseById: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  course: state.course.course,
});

export default connect(mapStateToProps, { getCurrentCourseById })(
  StartCourse
);
