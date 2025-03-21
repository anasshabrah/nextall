// File: C:\Users\hanos\nextall\frontend\src\components\_main\home\hero\index.jsx
import React from 'react';
import { Suspense } from 'react';

// components
import SingleSlideCarousel from 'src/components/carousels/singleSlide';
import MegaMenu from 'src/components/mega-menu/MegaMenuDesktopVertical';
// slides data
import { data } from './data';
// mui
import { Stack } from '@mui/material';

export default function Hero({}) {
  return (
    <Stack direction="row" gap={2} mt={2}>
      <Suspense>
        <MegaMenu />
      </Suspense>
      <SingleSlideCarousel data={data} />
    </Stack>
  );
}
