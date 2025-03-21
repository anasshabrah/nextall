// File: C:\Users\hanos\nextall\frontend\src\components\skeletons\cart\index.jsx
import React from 'react';
// mui
import { Container } from '@mui/material';
// components
import Breadcrumbs from '../breadcrumbs';
import MainCartSkeleton from './mainCart';

export default function CartSkeleton() {
  return (
    <Container maxWidth="xl">
      <Breadcrumbs />
      <MainCartSkeleton />
    </Container>
  );
}
