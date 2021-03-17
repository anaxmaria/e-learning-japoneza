import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllCourses } from "../../actions/profile";
import { getFilteredCourse } from "../../actions/profile";

const StudentDashboard = ({
  auth: { user },
  getAllCourses,
  course: { courses, course },
  getFilteredCourse,
}) => {
  useEffect(() => {
    getAllCourses();
  }, []);

  const [enteredFilter, setEnteredFilter] = useState("");
  return (
    <Fragment>
      <p className="lead">
      <i class="fas fa-user-ninja"></i> Welcome {user && user.name}
      </p>
      <div class="sidenav">
        <Link to="/student/my-courses">
          <i class="fas fa-book-open .text-success"></i> My courses
        </Link>
        <Link to="/student/quiz-result">
          <i class="fas fa-question .text-success"></i> Quiz Results
        </Link>
      </div>
      <form class="form-inline mr-auto">
        <div class="active-pink-3 active-pink-4 mb-4">
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
        class="btn btn-outline-danger"
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
              courses.map((result) => (
                <div className="videoContainer">
                  <div>
                    {/*video was here*/}
                  </div>
                  <div className="text-black">
                    <strong className="courseTitle">{result.name}</strong>
                    <br />
                    <strong className="courseAuthor">{result.author}</strong>
                    <br />
                    <Link
                      to={`/student/describe-course/${result._id}`}
                      class="myButton"
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
                {/*video was here*/}
                <div className="text-black">
                  <strong className="courseTitle">{course.name}</strong>
                  <br />
                  <strong className="courseAuthor">{course.author}</strong>
                  <br />
                  <Link
                    to={`/student/describe-course/${course._id}`}
                    class="myButton"
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
export default connect(mapStateToProps, { getAllCourses, getFilteredCourse })(
  StudentDashboard
);
