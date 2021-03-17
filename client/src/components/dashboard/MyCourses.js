import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getCourseByStudent, getCourseById } from "../../actions/profile";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const MyCourses = ({
  auth: { user },
  getCourseByStudent,
  course: { courses, course, coursesAdded, myCourses },
}) => {
  useEffect(() => {
    getCourseByStudent(user && user.name);
  }, []);
  return (
    <div>
      <h1>My Courses</h1>
      <div>
        {myCourses &&
          myCourses.map((result) => (
            <div className="videoContainer">
              <div>
              </div>
              <div className="text-black">
                <strong className="courseTitle">{result.courseName}</strong>
                <br />
                <strong className="courseAuthor">{result.authorName}</strong>
                <br />

                <Link
                  to={`/student/start-course/${result.courseId}`}
                  class="myButton"
                >
                  Reattempt Course
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

MyCourses.propTypes = {
  getCourseByStudent: PropTypes.func.isRequired,
  course: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  course: state.course,
});
export default connect(mapStateToProps, { getCourseByStudent })(MyCourses);
