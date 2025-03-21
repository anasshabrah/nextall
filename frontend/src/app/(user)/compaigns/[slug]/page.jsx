import { Box, Container } from '@mui/material';
import ShopDetailCover from 'src/components/_admin/shops/shopDetailCover';
import ProductList from 'src/components/_main/products';
import mongoose from 'mongoose';

// Import the Compaign model from your backend
// Adjust the relative path if needed.
import Compaign from '../../../backend/src/models/Compaign';

// Helper: Connect to MongoDB if not already connected
async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI);
}

export const dynamic = 'error';
export const revalidate = 10;

export async function generateStaticParams() {
  await connectToDatabase();
  // Query only the 'slug' field from all compaigns.
  const compaigns = await Compaign.find().select('slug').lean();
  return compaigns.map((compaign) => ({ slug: compaign.slug }));
}

export async function generateMetadata({ params }) {
  await connectToDatabase();
  // Fetch the compaign data based on the slug.
  const compaign = await Compaign.findOne({ slug: params.slug }).lean();
  if (!compaign) {
    throw new Error('Compaign not found');
  }
  return {
    title: compaign.metaTitle || compaign.title || 'Compaign',
    description: compaign.metaDescription || '',
    openGraph: {
      images: [compaign.cover?.url || ''],
    },
  };
}

export default async function Listing({ params }) {
  await connectToDatabase();
  const compaign = await Compaign.findOne({ slug: params.slug }).lean();
  if (!compaign) {
    throw new Error('Compaign not found');
  }
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
