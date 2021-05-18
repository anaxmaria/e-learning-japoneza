import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import user from '../../img/user.png';

const CommentItem = ({
  courseId,
  comm: { _id, text, name, avatar, student, date },
  auth,
}) => {
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <img class="round-img" src={user} alt="" />
        <h6>{name}</h6>
      </div>
      <div>
        <h5>{text}</h5>
        <p class="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  courseId: PropTypes.number.isRequired,
  comm: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(CommentItem);
