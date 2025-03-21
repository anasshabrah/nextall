// File: C:\Users\hanos\nextall\frontend\src\app\(user)\categories\page.jsx
import React from 'react';
import { Typography, Grid, Box, Stack, Container } from '@mui/material';
import CategoryCard from 'src/components/cards/category';
import * as api from 'src/services';

export default async function Categories() {
  const res = await api.getAllCategoriesByUser();
  const categories = Array.isArray(res?.data) ? res.data : [];
  return (
    <Container maxWidth="xl">
      <Stack direction={'column'} sx={{ gap: 3, mt: 5 }}>
        <Box>
          <Typography variant="h2" color="text.primary" textAlign="center">
            Categories
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center">
            Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            {categories.map((inner) => (
              <React.Fragment key={inner._id || inner.slug}>
                <Grid item lg={2} md={3} sm={4} xs={4}>
                  <CategoryCard category={inner} isLoading={false} />
                </Grid>
              </React.Fragment>
            ))}
            {!categories.length && (
              <Typography variant="h3" color="error.main" textAlign="center">
                Categories not found
              </Typography>
            )}
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
}
