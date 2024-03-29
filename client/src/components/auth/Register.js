import React from "react";
import { connect } from "react-redux";
import { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { registerStudent } from "../../actions/auth";
import regImg from "../../img/Work_from_home.jpg";
import PropTypes from "prop-types";

const Register = ({ setAlert, isAuthenticated, registerStudent, isAdmin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const { name, email, password, password2} = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  var status = "Student or Learning"
  // TODO: update status
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
        registerStudent({ name, email, password});
    }
  };

  if (isAuthenticated && isAdmin) {
    return <Redirect to="/dashboard" />;
  } else if (isAuthenticated && !isAdmin) {
    return <Redirect to="/student/dashboard" />;
  }
  return (
    <Fragment>
      {window.scrollTo(0, 0)}
      <div className="imgLogin">
        <img src={regImg} alt="imgLogin" height="450"></img>
      </div>{" "}
      <h1 className=".text-secondary">
        {" "}
        <i className="fas fa-user-ninja"></i> Welcome to PeraPera! 
      </h1>
      <br></br>
      <h5>
        This app is for those who want to learn Japanese!
      </h5>
      <br></br>
      <h2>Would you like to register? </h2>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => onChange(e)}
            name="email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <select name="status">
            <option value="0">Select Sex</option>
            <option value="Developer">M</option>
            <option value="Student or Learning">F</option>
            <option value="Not Saying">Prefer not to say</option>
          </select>
        </div>
        <br></br>
        <input type="submit" className="btn btn-secondary" value="Register" />
      </form>
      <br></br>
      <p className="my-1">
        Do you already have an account? <Link to="/login">Log In Here!</Link>
      </p>
    </Fragment>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  registerStudent: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
});
export default connect(mapStateToProps, {
  setAlert,
  registerStudent,
})(Register);
