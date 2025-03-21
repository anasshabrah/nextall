// File: C:\Users\hanos\nextall\frontend\src\components\skeletons\home\index.jsx
import React from 'react';
// MUI
import { Container } from '@mui/material';
// Components
import HeroSkeleton from 'src/components/skeletons/home/hero';
import CategoriesSkeleton from 'src/components/skeletons/home/categories';
import TopBanners from './topBanners';

export default function HomeSkeleton() {
  return (
    <>
      <HeroSkeleton />
      <Container maxWidth="xl">
        <TopBanners />
        <CategoriesSkeleton />
      </Container>
    </>
  );
}
