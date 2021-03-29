import React from "react";
import { Link } from "react-router-dom";
export const DashboardActions = () => {
  return (
    <div class="sidenav">
      <Link to="/edit-profile">
        <i class="fas fa-user-circle .text-success"></i> Edit Profile
      </Link>
      <Link to="/add-courses">
        <i class="fas fa-book .text-success"></i> Add Courses
      </Link>
      <Link to="/add-quizz">
        <i class="fas fa-question .text-success"></i> Add Quizzes
      </Link>
      <Link to="/add-assignment">
        <i class="fas fa-keyboard"></i> Add Assignments
      </Link>
      <Link to="/added-courses">
        <i class="fas fa-book-open"></i> Added Courses
      </Link>
    </div>
  );
};
export default DashboardActions;
