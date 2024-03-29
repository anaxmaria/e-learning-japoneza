import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { getCourseById, getCurrentCourseById } from "../../actions/profile";
import PropTypes from "prop-types";
import CommentItem from "../posts/CommentItem";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { addMyCourse } from "../../actions/profile";

const DescriptionOfCourse = ({
  match,
  getCurrentCourseById,
  course,
  addMyCourse,
}) => {
  useEffect(() => {
    getCurrentCourseById(match.params.id);
    console.log("useEffect");
  }, [getCurrentCourseById, match.params.id]);

  const [formData, setFormData] = useState({
    id: match.params.id,
    courseName: course && course.name,
    description: course && course.description,
  });
  const { id, courseName, description } = formData;
  return (
    <Fragment>
      {window.scrollTo(0, 0)}
      <div className="courseTitleContainer">
        {course && course.name}
      </div>
      <div className="myText3">{parse(`${course && course.description}`)}</div>
      <div className="myText">
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
        <br /><br />
        <br />
        {course && <PostItem courseId={course._id} />}
        <br />
        <div className="posts">
          {course &&
            course.comment.map((comm) => (
              <CommentItem key={comm._id} comm={comm} courseId={course._id} />
            ))}
        </div>
      <div>
        <Link to={`/student/dashboard`} className="myButton3">
          Back to Dashboard
        </Link>
      </div>
    </Fragment>
  );
};


DescriptionOfCourse.propTypes = {
  getCurrentCourseById: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  course: state.course.course,
});

export default connect(mapStateToProps, { getCurrentCourseById, addMyCourse })(
  DescriptionOfCourse
);
