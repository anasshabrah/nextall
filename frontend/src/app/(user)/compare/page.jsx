// File: C:\Users\hanos\nextall\frontend\src\app\(user)\compare\page.jsx
import React from 'react';
import { Container } from '@mui/material';
import dynamic from 'next/dynamic';
import HeaderBreadcrumbsSkeleton from 'src/components/skeletons/breadcrumbs';
import Compare from 'src/components/_main/compare';

const HeaderBreadcrumbs = dynamic(() => import('src/components/headerBreadcrumbs'), {
  loading: () => <HeaderBreadcrumbsSkeleton />
});

export default function Page() {
  return (
    <Container maxWidth="xl">
      <HeaderBreadcrumbs
        heading="Compare"
        links={[
          { name: 'Home', href: '/' },
          { name: 'Compare' }
        ]}
      />
      <Compare />
    </Container>
  );
}
