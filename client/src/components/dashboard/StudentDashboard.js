import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllCourses } from "../../actions/profile";
import { getFilteredCourse } from "../../actions/profile";
import cat from '../../img/cat.jpg';
import { addMyCourse } from "../../actions/profile";

const StudentDashboard = ({
  auth: { user },
  getAllCourses,
  course: { courses, course },
  getFilteredCourse,
  addMyCourse
}) => {
  useEffect(() => {
    getAllCourses();
  }, []);

  const [enteredFilter, setEnteredFilter] = useState("");
  return (
    <Fragment>
      {window.scrollTo(0, 0)}
      <p className="lead">
        <i className="fas fa-user-ninja"></i> Welcome {user && user.name}! 元気ですか？
      </p>
      <div className="sidenav">
        <Link to="/student/my-courses">
          <i className="fas fa-laptop-code .text-success"></i> My courses
        </Link>
        <Link to="/student/quiz-result">
          <i className="fas fa-chart-line .text-success"></i> Quiz Results
        </Link>
      </div>
      <form className="form-inline mr-auto">
        <div className="active-pink-3 active-pink-4 mb-4">
          <input
            type="text"
            name="search"
            className="form-control"
            size="70"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
            placeholder="What are you looking for?"
          />
        </div>
      </form>
      <button
        type="submit"
        className="btn btn-outline-danger"
        onClick={(e) => {
          e.preventDefault();
          getFilteredCourse(enteredFilter);
        }}
      >
        Search
      </button>
      <div>
        {" "}
        <br></br> <p className="learnMessage"> What to learn next</p> <br></br>
        {enteredFilter === "" ? (
          <div>
            {courses &&
              courses.map((result,idx) => (
                <div key={idx} className="videoContainer">
                  <img  src={cat} alt="cat"/>
                  <div className="text-black">
                    <strong className="courseTitle">{result.name}</strong>
                    <br />
                    <Link
                      to={`/student/describe-course/${result._id}`}
                      className="myButton"
                      onClick={() => {
                        addMyCourse({id: result._id, courseName: result.name, description: result.description});
                      }}
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <ul>
            {course && (
              <div className="videoContainer">
                <img  src={cat} alt="cat"/>
                <div className="text-black">
                  <strong className="courseTitle">{course.name}</strong>
                  <br />
                  <strong className="courseAuthor">{course.author}</strong>
                  <br />

                  <Link
                    to={`/student/describe-course/${course._id}`}
                    className="myButton"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            )}
          </ul>
        )}
      </div>
    </Fragment>
  );
};

StudentDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllCourses: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  course: state.course,
});
export default connect(mapStateToProps, { getAllCourses, getFilteredCourse, addMyCourse })(
  StudentDashboard
);
