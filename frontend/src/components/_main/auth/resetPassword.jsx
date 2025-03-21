// File: C:\Users\hanos\nextall\frontend\src\components\_main\auth\resetPassword.jsx
import React from 'react';
import PropTypes from 'prop-types';
// components
import ResetPasswordForm from 'src/components/forms/resetPassword';

const ResetPasswordMain = ({ token }) => {
  return <ResetPasswordForm token={token} />;
};

ResetPasswordMain.propTypes = {
  token: PropTypes.string.isRequired
};

export default ResetPasswordMain;
