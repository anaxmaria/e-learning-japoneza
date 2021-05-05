import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getCourseByStudent, getCourseById } from "../../actions/profile";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import dog from '../../img/dog.jpg';

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
      {window.scrollTo(0, 0)}
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
                <div><img className="myCourseImg" src={dog} alt="dog"/></div>
                {/**/}
                <Link
                  to={`/student/describe-course/${result.courseId}`}
                  class="myButton"
                >
                  Reattempt Course
                </Link>
              </div>
            </div>
          ))}
      </div>
      </div>
      <br></br>
      <br></br>
      <Link to={`/student/dashboard`} className="myButton3">
          Back to Dashboard
      </Link>
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
