import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "zingchart/es6";
import ZingChart from "zingchart-react";
import { getAllCourses } from "../../actions/profile";
//import "zingchart-react/dist/modules/zingchart-depth.min.js";
import {
  getCourseByAuthor,
  deleteCourse,
  getQuizzByAuthor,
  getAssignmentByAuthor,
} from "../../actions/profile";
import { connect } from "react-redux";
const Statistics = ({
  auth: { user },
  course: { courses, course, coursesAdded },
  quizz: { quizzAdded },
  assignment: { assignmentsAdded },
  getAllCourses,
  getAssignmentByAuthor,
  getQuizzByAuthor,
}) => {
  useEffect(() => {
    getAllCourses();
  }, []);
  useEffect(() => {
    getQuizzByAuthor(user && user.name);
  }, []);
  useEffect(() => {
    getAssignmentByAuthor(user && user.name);
  }, []);
  const myData = {
    type: "line",
    title: {
      text: "Number of monthly new users",
    },
    "scale-x": {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },

    series: [{ values: [0, 1, 0, 1, 2, 1, 1] }],
  };

  const myData3 = {
    type: "pie",
    legend: {
      layout: "1x2",
      x: "10%",
      y: "16%",
    },
    title: {
      text: "Users by gender",
    },
    series: [
      { values: [3], text: "M" },
      { values: [3], text: "F" },
    ],
  };
  return (
    <div>
      <h1 className=".text-secondary">
        {" "}
        <i class="far fa-chart-bar .text-success"></i> Statistics
      </h1>
      <p className="padd">
        <div className="container3">
          <div className="boxStat">
            <div className="icon">
              {" "}
              <i class="fas fa-book .text-success"></i>
              <div className="content">
                <h3>{courses.length} courses</h3>
              </div>
            </div>
          </div>
          <div className="boxStat">
            <div className="icon">
              {" "}
              <i class="fas fa-question .text-success"></i>
              <div className="content">
                <h3>{quizzAdded.length} quizzes</h3>
              </div>
            </div>
          </div>
          <div className="boxStat">
            <div className="icon">
              {" "}
              <i class="fas fa-user-circle .text-success"></i>
              <div className="content">
                <h3>6 cursanti</h3>
              </div>
            </div>
          </div>
          <div className="boxStat">
            <div className="icon">
              {" "}
              <i class="far fa-calendar-check"></i>
              <div className="content">
                <h3>{assignmentsAdded.length} assignments</h3>
              </div>
            </div>
          </div>
        </div>
      </p>

      <p className="centerText">
        <ZingChart data={myData} height="400" width="600"></ZingChart>
      </p>
      <p className="centerText">
        <ZingChart data={myData3} height="400" width="600"></ZingChart>
      </p>
    </div>
  );
};

Statistics.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllCourses: PropTypes.func.isRequired,
  course: PropTypes.array.isRequired,
  quizz: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  course: state.course,
  quizz: state.quizz,
  assignment: state.assignment,
});
export default connect(mapStateToProps, {
  getAllCourses,
  deleteCourse,
  getQuizzByAuthor,
  getAssignmentByAuthor,
})(Statistics);
