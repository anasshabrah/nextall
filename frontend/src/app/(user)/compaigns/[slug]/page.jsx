// File: C:\Users\hanos\nextall\frontend\src\app\(user)\compaigns\[slug]\page.jsx

import { Box, Container } from '@mui/material';
import ShopDetailCover from 'src/components/_admin/shops/shopDetailCover';
import ProductList from 'src/components/_main/products';

// Determine base URL: use the environment variable if set and not localhost.
const baseUrl =
  process.env.BASE_URL && process.env.BASE_URL !== 'http://localhost:3000'
    ? process.env.BASE_URL
    : '';

export const dynamic = 'error';
export const revalidate = 10;

export async function generateStaticParams() {
  const res = await fetch(`${baseUrl || ''}/api/compaigns-slugs`);
  if (!res.ok) {
    throw new Error('Failed to fetch compaign slugs');
  }
  const { data } = await res.json();
  return data?.map((compaign) => ({ slug: compaign.slug })) || [];
}

export async function generateMetadata({ params }) {
  const res = await fetch(`${baseUrl || ''}/api/compaigns/${params.slug}`);
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
  const res = await fetch(`${baseUrl || ''}/api/compaign-title/${slug}`);
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
