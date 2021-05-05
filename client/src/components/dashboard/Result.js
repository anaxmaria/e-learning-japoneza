import React, { useEffect, useState, Fragment } from "react";
import { addMyQuizResult } from "../../actions/profile";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const Result = ({ score, quizz, addMyQuizResult }) => {
  const [formData, setFormData] = useState({
    result: score,
    title: quizz.title,
    noQuestions: quizz.questions.length,
  });
  const { result, title } = formData;

  function messageAfterResult(){
  if(score == quizz.questions.length){
    return "Well done!"
  }
  if(score != quizz.questions.length && score >= quizz.questions.length){
    return "You did well, but try reading the course again!"
  }
  if(score != 0 && score < quizz.questions.length){
    return "Don't worry! Try reading the course one more time and come back!"
  }
  if(score == 0){
    return "Maybe you didn't pay enough attention!"
  }
}

  return (
    <Fragment>
    <div className="score-board">
      <div className="score">
        You scored {score}/{quizz.questions.length} correct answers! 
        <h4>{messageAfterResult()}</h4>
        <br />
        <button
          className="btn btn-black"
          onClick={() => {
            console.log("rulaaaaaaaaaaaaaaaaaaa");
            console.log(formData);
            addMyQuizResult(formData);
          }}
        >
          Save your result!
        </button>
        
      <Fragment>
        <Link to={`/student/dashboard`} className="btn btn-black">
          Back to Dashboard
        </Link>
      </Fragment>
      </div>
    </div>
    </Fragment>
  );
};
export default connect(null, { addMyQuizResult })(Result);
