import React, {useEffect} from "react";
import { Fragment, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import lms from "../../img/login6.jpg";
import { loginStudent } from "../../actions/auth";

const Login = ({ isAuthenticated, loginStudent, isAdmin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  let hasSubmitted = false;
  
  const onSubmit = async (e) => {

    e.preventDefault();
    hasSubmitted = true;
    console.log("hasSubmitted")

    await loginStudent(email, password)
    console.log("abc2"+isAuthenticated+isAdmin)

    if (email == "ana@gmail.com" || email == "admin@gmail.com") {
      console.log("redirect to admin")
      history.push("/dashboard"); 
    } else {
      history.push("/student/dashboard");
    }
};

const history = useHistory();
    
    // useEffect(() => {
    //   //let isMounted = true;
    //   if(hasSubmitted==true){
    //   loginStudent(email, password).then(data => {
    //     //if(isMounted){
    //       //setFormData({...formData});
    //       // if (isAuthenticated && isAdmin) {
    //       //   history.push("/dashboard"); 
    //       // } else if (isAuthenticated && !isAdmin) {
    //       //   history.push("/student/dashboard");
    //       // }
    //    // }
    //   })

   // console.log("abc2");
    // return() => {
    //   isMounted = false;
    // } 
  //}
   // })
    

  //Redirect if logged in
 
  console.log(isAuthenticated);
  console.log(isAdmin);
  // if (isAuthenticated && isAdmin) {
  //   return <Redirect to="/dashboard" />;
  // } else if (isAuthenticated && !isAdmin) {
  //     return <Redirect to="/student/dashboard" />;
  // }



  return (
    <Fragment>
      {window.scrollTo(0, 0)}
      <div className="imgLogin">
        <img src={lms} alt="imgLogin" height="300"></img>
      </div>{" "}
      <h1 className=".text-secondary">
        {" "}
        <i className="fas fa-user-ninja"></i> Welcome back!
      </h1>
      <br></br>
      <h4>
        Log in to get back to studying Japanese!
      </h4>
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
        <br></br>
        <input type="submit" className="btn btn-secondary" value="Login" />
      </form>
      <br></br>
      <p className="my-1">
        You don't have an account? <Link to="/register">Sign Up Here!</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  loginStudent: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
});
export default connect(mapStateToProps, { loginStudent })(Login);
