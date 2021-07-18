import React from "react";
import { connect } from "react-redux";
import { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { updateEmail, updatePassword } from "../../actions/profile";
import regImg from "../../img/abcd.png";
import PropTypes from "prop-types";

const EditProfile = ({auth: { user }, setAlert, updateEmail, updatePassword}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
        //registerStudent({ name, email, password});
    }
  };

  const onChangePassword = async (e) => {
    //e.preventDefault();
    updatePassword(password);
  }

  const onChangeEmail = async (e) => {
    //e.preventDefault();
    updateEmail(email);
  }

  
  return (
    <Fragment>
      {window.scrollTo(0, 0)}
      <div className="imgLogin">
        <img src={regImg} alt="img3" height="450"></img>
      </div>{" "}
      <br></br>
      <h2>Edit your profile here </h2>
      <form className="form">
      <div className="form-group">
        <label>Change your name</label>
          <input
            type="email"
            placeholder="New name"
            value={name}
            onChange={(e) => onChange(e)}
            name="name"
          />
        </div>
        <input type="submit" className="btn btn-secondary" value="Change name"/>
        <div className="form-group">
        <label>Change your email address</label>
          <input
            type="email"
            placeholder="New email address"
            value={email}
            onChange={(e) => onChange(e)}
            name="email"
          />
        </div>
        <input type="submit" className="btn btn-secondary" value="Change email" onClick={(e) => onChangeEmail(e)}/>
        <div className="form-group">
        <label>Change your password</label>
          <input
            type="password"
            placeholder="New password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-secondary" value="Change password" onClick={(e) => onChangePassword(e)}/>
      </form>
    </Fragment>
  );
};
EditProfile.propTypes = {
  updateEmail: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  updateEmail,
  updatePassword,
})(EditProfile);
