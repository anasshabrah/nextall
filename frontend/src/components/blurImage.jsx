// File: C:\Users\hanos\nextall\frontend\src\components\blurImage.jsx
'use client';
import PropTypes from 'prop-types';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function BlurImage({ static: _static, ...props }) {
  const isDesktop = useMediaQuery('(min-width:600px)');
  return <Image sizes={isDesktop ? '14vw' : '50vw'} {...props} />;
}

BlurImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  // If you want to support a `static` prop at all, declare it as bool.
  // But if it's not used, you might want to remove it entirely.
  static: PropTypes.bool
};
