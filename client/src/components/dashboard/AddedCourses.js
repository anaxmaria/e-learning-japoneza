import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import {
  getCourseByAuthor,
  getAllCourses,
  deleteCourse,
  getQuizzByAuthor,
  getQuizzes,
  getAssignmentByAuthor,
  getAllAssignments,
  deleteAssignment,
  deleteQuizz,
} from "../../actions/profile";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
const AddedCourses = ({
  auth: { user },
  course: { courses, course, coursesAdded },
  quizz: { quizzes, quizzAdded },
  assignment: { assignments, assignmentsAdded },
  getAllCourses,
  getAllAssignments,
  getQuizzes,
  deleteCourse,
  deleteAssignment,
  deleteQuizz,
}) => {
  useEffect(() => {
    getAllCourses();
  }, []);
  useEffect(() => {
    getQuizzes();
  }, []);
  useEffect(() => {
    getAllAssignments();
  }, []);

  const myCourses =
    courses &&
    courses.map((course) => (
      <tr key={course._id}>
        <td>{course.name}</td>
        <td>
          <Moment format="YYYY/MM/DD">{course.date}</Moment>
        </td>
        <td>
          <Link
            to={`/add-courses/${course._id}`}
            className="btn btn-success"
            courseEdit={course}
          >
            {" "}
            Edit
          </Link>
        </td>
        <td>
          <button
            onClick={() => {
              deleteCourse(course._id);
              courses.splice(courses.indexOf(course._id), 1);
            }}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  const myQuizzes =
    quizzes &&
    quizzes.map((quiz) => (
      <tr key={quiz._id}>
        <td>{quiz.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{quiz.date}</Moment>
        </td>
        <td>
          <button
            onClick={() => {
              deleteQuizz(quiz._id);
              quizzes.splice(quizzes.indexOf(quiz._id), 1);
            }}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  const myAssignmets =
    assignments &&
    assignments.map((ass) => (
      <tr key={ass._id}>
        <td>{ass.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{ass.date}</Moment>
        </td>
        <td>
          <button
            onClick={() => {
              deleteAssignment(ass._id);
              assignments.splice(assignments.indexOf(ass._id), 1);
            }}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  return (
    <Fragment>
      {window.scrollTo(0, 0)}
      <h2 className="titleDashboard">Added Courses</h2>
      <table className="table">
        <tbody>{myCourses}</tbody>
      </table>
      <h2 className="titleDashboard">Added Quizzes</h2>
      <table className="table">
        <tbody>{myQuizzes}</tbody>
      </table>
      <h2 className="titleDashboard">Added Assignments</h2>
      <table className="table">
        <tbody>{myAssignmets}</tbody>
      </table>
    </Fragment>
  );
};

AddedCourses.propTypes = {
  auth: PropTypes.object.isRequired,
  getCourseByAuthor: PropTypes.func.isRequired,
  getAllCourses: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  course: PropTypes.array.isRequired,
  quizz: PropTypes.object.isRequired,
  getQuizzes: PropTypes.object.isRequired,
  getAllAssignments: PropTypes.object.isRequired,
  deleteAssignment: PropTypes.func.isRequired,
  deleteQuizz: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  course: state.course,
  quizz: state.quizz,
  assignment: state.assignment,
});
export default connect(mapStateToProps, {
  getAllCourses,
  getCourseByAuthor,
  deleteCourse,
  getQuizzByAuthor,
  getQuizzes,
  getAssignmentByAuthor,
  getAllAssignments,
  deleteAssignment,
  deleteCourse,
  deleteQuizz
})(AddedCourses);
