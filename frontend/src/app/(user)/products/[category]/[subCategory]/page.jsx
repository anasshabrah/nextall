// File: C:\Users\hanos\nextall\frontend\src\app\(user)\products\[category]\[subCategory]\page.jsx

import { Box, Container } from '@mui/material';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import ProductList from 'src/components/_main/products';

// api
import * as api from 'src/services';

export const dynamic = 'error';
export const revalidate = 10;

export async function generateStaticParams() {
  const { data } = await api.getSubCategorySlugs();
  // Ensure that an array is always returned—even if data is undefined
  return (data?.map((cat) => ({
    subCategory: cat.slug,
    category: cat.parentCategory.slug,
  })) || []);
}

export async function generateMetadata({ params }) {
  const { data: response } = await api.getSubCategoryBySlug(params.subCategory);
  return {
    title: response.metaTitle || response.name,
    description: response.metaDescription,
    openGraph: {
      images: [response.cover.url],
    },
  };
}

export default async function Listing({ params }) {
  const { category, subCategory } = params;
  const { data: subCategoryData } = await api.getSubCategoryTitle(subCategory);

  return (
    <Box>
      <Box sx={{ bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <HeaderBreadcrumbs
            heading={subCategoryData?.name}
            links={[
              { name: 'Home', href: '/' },
              { name: 'Products', href: '/products' },
              { name: subCategoryData?.parentCategory?.name, href: `/products/${category}` },
              { name: subCategoryData?.name },
            ]}
          />
          <ProductList subCategory={subCategoryData} />
        </Container>
      </Box>
    </Box>
  );
}
