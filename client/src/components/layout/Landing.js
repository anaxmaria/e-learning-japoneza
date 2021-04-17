import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export const Landing = ({ auth: { user, isAuthenticated, isAdmin } }) => {
  if (isAuthenticated && isAdmin) {
    return <Redirect to="/dashboard" />;
  } else if (isAuthenticated && !isAdmin) {
    return <Redirect to="/student/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Let's learn Japanese</h1>
          <p className="lead">
            自分の言語の限界が、自分の世界の限界。
            <p>
              The limits of my language are the limits of my world.
            </p>
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  isAdmin: state.auth.isAdmin,
});
export default connect(mapStateToProps)(Landing);
