import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addQuizz, getQuizzes } from "../../actions/profile";
import AddQuestions from "./AddQuestions";
import { addQuestion } from "../../actions/profile";
import regImg from "../../img/quiz3.jpg";

const AddQuizz = ({
  addQuizz,
  quizz: { quizz, quizzes, loading },
  getQuizzes,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    courseName: "",
  });
  const { title, courseName } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <div className="imgLogin">
        <img src={regImg} alt="imgLogin" height="600"></img>
      </div>
      <h1 className=".text-secondary">Add a new quiz here</h1>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addQuizz(formData);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            autocomplete="off"
            placeholder="Quizz Title"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
          />{" "}
        </div>
        <div>
          <input
            type="text"
            placeholder="Course name"
            name="courseName"
            value={courseName}
            onChange={(e) => onChange(e)}
          />
        </div>
        <br></br>
        <p>Create the quiz first!</p>
        <input type="submit" className="btn btn-primary my-1" />
      </form>
      <AddQuestions />
      <Link to={`/dashboard`} className="myButton3">
          Back to Dashboard
      </Link>
    </Fragment>
  );
};

AddQuizz.propTypes = {
  addQuizz: PropTypes.func.isRequired,
  addQuestion: PropTypes.func.isRequired,
  quizz: PropTypes.object.isRequired,
  getQuizzes: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  quizz: state.quizz,
});

export default connect(mapStateToProps, { addQuizz, addQuestion, getQuizzes })(
  AddQuizz
);
