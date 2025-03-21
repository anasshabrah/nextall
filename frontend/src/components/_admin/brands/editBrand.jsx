// File: C:\Users\hanos\nextall\frontend\src\components\_admin\brands\editBrand.jsx
import React from 'react';
// components
import BrandsForm from 'src/components/forms/brand';

export default function addBrand({ data, isLoading }) {
  return (
    <div>
      <BrandsForm data={data} isLoading={isLoading} />
    </div>
  );
}
