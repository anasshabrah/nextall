// File: C:\Users\hanos\nextall\frontend\src\components\_admin\subCategories\addCategory.jsx
import React from 'react';
import PropTypes from 'prop-types';
// components
import SubCategoryForm from 'src/components/forms/subCategory';

AddCategory.propTypes = {
  categories: PropTypes.array.isRequired
};

export default function AddCategory({ categories }) {
  return (
    <div>
      <SubCategoryForm categories={categories} />
    </div>
  );
}
