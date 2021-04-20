import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = ({ profile: { user: { _id } } }) => {
  return (
    <div class="dash-buttons">
      <Link to={`/profiles/${_id}`} className="btn btn-dark">
        <i className="fas fa-user-circle"></i> View Profile
      </Link>
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
        </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> Add Experience
        </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary"></i> Add Education
        </Link>
    </div>
  )
};

export default DashboardActions;
