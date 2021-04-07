import React from "react";
import { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import lms from "../../img/login6.jpg";
import {
  login,
} from "../../actions/auth";
import { loginStudent } from "../../actions/auth";

const Login = ({ login, isAuthenticated, loginStudent, isAdmin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  var status = "Student or Learning"
  
  const onSubmit = async (e) => {
    e.preventDefault();
      loginStudent(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated && isAdmin) {
    return <Redirect to="/dashboard" />;
  } else if (isAuthenticated && !isAdmin) {
    return <Redirect to="/student/dashboard" />;
  }

  return (
    <Fragment>
      {window.scrollTo(0, 0)}
      <div className="imgLogin">
        <img src={lms} alt="imgLogin" height="300"></img>
      </div>{" "}
      <h1 className=".text-secondary">
        {" "}
        <i className="fas fa-user-ninja"></i> Sign In
      </h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => onChange(e)}
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-secondary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loginStudent: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
});
export default connect(mapStateToProps, { login, loginStudent })(Login);
