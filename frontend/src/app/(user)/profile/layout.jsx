// File: C:\Users\hanos\nextall\frontend\src\app\(user)\profile\layout.jsx
import React from 'react';
import PropTypes from 'prop-types';

// guard
import AuthGuard from 'src/guards/auth';

export default function ProfileLayout({ children }) {
  return <AuthGuard>{children}</AuthGuard>;
}

ProfileLayout.propTypes = {
  children: PropTypes.node.isRequired
};
