// File: C:\Users\hanos\nextall\frontend\src\app\(user)\search\page.jsx
import React from 'react';
import dynamic from 'next/dynamic';

// dynamic import
const Search = dynamic(() => import('src/components/dialog/search/search'));

export default function Searchs() {
  return <Search mobile />;
}
