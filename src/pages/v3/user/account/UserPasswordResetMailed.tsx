import React from 'react';
import { Link } from 'umi';

const UserPasswordResetMailed = () => {
  return (
    <div>
      <p> Check your email for a link to reset your password. </p>

      <p>
        If it doesn’t appear within a few minutes, check your spam folder or
        <Link to="/user/password/reset/request"> try again</Link>
      </p>

      <p>The link is valid only 3 hours.</p>
    </div>
  );
};

export default UserPasswordResetMailed;
