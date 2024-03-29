import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Statistics from "./Statistics";
import DashboardActions from "./DashboardActions";

const Dashboard = ({
  auth: { user },
}) => {
  useEffect(() => {
  }, []);
  return (
    <Fragment>
      {window.scrollTo(0, 0)}
      {/* <p className="display-4 py"> */}
      <h1 className="titleDashboard">
        <i className="fas fa-user-ninja"></i> Welcome {user && user.name}! 元気ですか？
      </h1>
      <br></br>
      <Fragment>
          <Statistics/>
      </Fragment>
      {(
        <Fragment>
          <DashboardActions />
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps)(Dashboard);
