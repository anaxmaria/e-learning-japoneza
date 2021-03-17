import React from "react";
import { connect } from "react-redux";
import { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { registerStudent } from "../../actions/auth";
import regImg from "../../img/register7.jpg";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated, registerStudent }) => {
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
      console.log(status);
      if (status == "Developer") {
        register({ name, email, password});
      } else {
        registerStudent({ name, email, password});
      }
    }
  };

  if (isAuthenticated && status == "Developer") {
    return <Redirect to="/dashboard" />;
  } else if (isAuthenticated && status == "Student or Learning") {
    return <Redirect to="/student/dashboard" />;
  }
  return (
    <Fragment>
      <div className="imgLogin">
        <img src={regImg} alt="imgLogin" height="450"></img>
      </div>{" "}
      <h1 className=".text-secondary">
        {" "}
        <i className="fas fa-user-ninja"></i> Sign Up
      </h1>
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
          </select>
        </div>
        <input type="submit" className="btn btn-secondary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  registerStudent: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
  setAlert,
  register,
  registerStudent,
})(Register);
