// File: C:\Users\hanos\nextall\frontend\src\app\(user)\compaigns\[slug]\page.jsx

import { Box, Container } from '@mui/material';
import ShopDetailCover from 'src/components/_admin/shops/shopDetailCover';
import ProductList from 'src/components/_main/products';

// We now use fetch directly and rely on BASE_URL from next.config.js
export const dynamic = 'error';
export const revalidate = 10;

export async function generateStaticParams() {
  // Use an absolute URL so that the API is reachable during build
  const res = await fetch(`${process.env.BASE_URL}/api/compaigns-slugs`);
  if (!res.ok) {
    throw new Error('Failed to fetch compaign slugs');
  }
  const { data } = await res.json();
  // Map over the data array to return the expected params structure
  return data?.map((compaign) => ({ slug: compaign.slug })) || [];
}

export async function generateMetadata({ params }) {
  const res = await fetch(`${process.env.BASE_URL}/api/compaigns/${params.slug}`);
  if (!res.ok) {
    throw new Error('Failed to fetch compaign data');
  }
  const { data: response } = await res.json();
  return {
    title: response.metaTitle || response.title || 'Compaign',
    description: response.metaDescription || '',
    openGraph: {
      images: [response.cover?.url || ''],
    },
  };
}

export default async function Listing({ params }) {
  const { slug } = params;
  const res = await fetch(`${process.env.BASE_URL}/api/compaign-title/${slug}`);
  if (!res.ok) {
    throw new Error('Failed to fetch compaign title');
  }
  const { data: compaign } = await res.json();
  return (
    <Box>
      <Box sx={{ bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <Box mt={3}>
            <ShopDetailCover page="compaigns" isUser data={compaign} isLoading={false} />
          </Box>
          <ProductList compaign={compaign} fetchFilters="getFiltersByShop" />
        </Container>
      </Box>
    </Box>
  );
}
