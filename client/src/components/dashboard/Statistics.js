import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "zingchart/es6";
import ZingChart from "zingchart-react";
//import "zingchart-react/dist/modules/zingchart-depth.min.js";
import {
  getAllCourses,
  deleteCourse,
  getQuizzes,
  getAllAssignments,
  getAssignmentByAuthor,
} from "../../actions/profile";
import { connect } from "react-redux";
const Statistics = ({
  auth: { user },
  course: { courses, course, coursesAdded },
  quizz: { quizzes },
  assignment: { assignments, assignmentsAdded },
  getAllCourses,
  getQuizzes,
  getAllAssignments,
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
      { values: [2], text: "M" },
      { values: [4], text: "F" },
      { values: [1], text: "Others" },
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
                <h3>{quizzes.length} quizzes</h3>
              </div>
            </div>
          </div>
          <div className="boxStat">
            <div className="icon">
              {" "}
              <i class="fas fa-user-circle .text-success"></i>
              <div className="content">
                <h3>7 students</h3>
              </div>
            </div>
          </div>
          <div className="boxStat">
            <div className="icon">
              {" "}
              <i class="far fa-calendar-check"></i>
              <div className="content">
                <h3>{assignments.length} assignments</h3>
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
  getQuizzes: PropTypes.object.isRequired,
  getAllAssignments: PropTypes.func.isRequired,
  course: PropTypes.array.isRequired,
  quizz: PropTypes.object.isRequired,
  assignment: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  course: state.course,
  quizz: state.quizz,
  assignment: state.assignment,
});
export default connect(mapStateToProps, {
  getAllCourses,
  getQuizzes,
  getAllAssignments,
})(Statistics);
