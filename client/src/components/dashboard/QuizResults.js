import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { getQuizzResultByStudent } from "../../actions/profile";
import { connect } from "react-redux";
import Moment from "react-moment";
import otsu from "../../img/otsu.jpeg";
import { Link } from "react-router-dom";

const QuizResults = ({
  getQuizzResultByStudent,
  auth: { user },
  quizz: { quizResults },
}) => {
  useEffect(() => {
    getQuizzResultByStudent(user && user.name);
  }, []);
  return (
    <Fragment>
      {window.scrollTo(0, 0)}
      <h2 className="titleDashboard">Here are your quiz results:</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Quiz Name</th>
            <th scope="col">Quiz Result</th>
            <th scope="col">Quiz Date</th>
          </tr>
        </thead>
        <tbody>
          {quizResults &&
            quizResults.map((q) => (
              <tr key={q._id}>
                <td>{q.title}</td>
                <td className="hide-sm">
                  {q.result}/{q.noQuestions}
                </td>
                <td>
                  <Moment format="YYYY/MM/DD">{q.date}</Moment>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="imgOtsu">
        <img src={otsu} id="imgOtsu" alt="imgOtsu" height="500" width="100"></img>
        <br />
        <h3 id="otsuText">おつかれさまでした！You did well! Next time I'm sure you'll do even better.</h3>
      </div>
      
      <Link to={`/student/dashboard`} className="myButton3">
          Back to Dashboard
      </Link>
    </Fragment>
  );
};

QuizResults.propTypes = {
  getQuizzResultByStudent: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  quizz: state.quizz,
});

export default connect(mapStateToProps, { getQuizzResultByStudent })(
  QuizResults
);
