import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';


const PostItem = ({ auth, post: {
  user,
  name,
  text,
  avatar,
  likes,
  comments,
  date
} }) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img
            className="round-img"
            src={avatar}
            alt=""
          />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>{' '}
          {likes.length > 0 && (
            <span>{likes.length}</span>
          )}
        </button>
        <a href="post.html" className="btn btn-primary">
          Discussion {' '}
          {comments.length > 0 && (
            <span className='comment-count'>{comments.length}</span>
          )}
        </a>
        {!auth.loading && user === auth.user._id && (
          <button type="button" className="btn btn-danger">
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  )
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(PostItem);
