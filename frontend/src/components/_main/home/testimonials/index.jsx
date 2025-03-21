// File: C:\Users\hanos\nextall\frontend\src\components\_main\home\testimonials\index.jsx
'use client';
import React from 'react';
// Next
import Image from 'next/image';
// MUI
import { alpha, Box, Grid, Typography, Container, Stack, Fab } from '@mui/material';
// Icons
import { IoArrowForward } from 'react-icons/io5';
import { IoArrowBackOutline } from 'react-icons/io5';
// Images
import bgImage from '../../../../../public/images/testimonial.png';
import AvatarImg from '../../../../../public/images/avatar.png';
// Components
import TestimonialCarousel from 'src/components/carousels/testimonial';
import { useSelector } from 'react-redux';

// Data for testimonials
const data = [
  {
    cover: { url: AvatarImg },
    name: 'Alex Thompson',
    jobTitle: 'Software Engineer',
    reviewdetail:
      'Exceptional shopping experience! The user-friendly interface and seamless navigation make finding and purchasing products a breeze. As a Marketing Manager, I appreciate the...',
    reviews: 4
  },
  {
    cover: { url: AvatarImg },
    name: 'John Thompson',
    jobTitle: 'Web Developer Engineer',
    reviewdetail:
      'Exceptional shopping experience! The user-friendly interface and seamless navigation make finding and purchasing products a breeze. As a Marketing Manager, I appreciate the...',
    reviews: 5
  },
  {
    cover: { url: AvatarImg },
    name: 'John Doe',
    jobTitle: 'Software Engineer',
    reviewdetail:
      'Exceptional shopping experience! The user-friendly interface and seamless navigation make finding and purchasing products a breeze. As a Marketing Manager, I appreciate the...',
    reviews: 3
  }
];

export default function Testimonials() {
  const { themeMode } = useSelector(({ settings }) => settings);
  const [[page, direction], setPage] = React.useState([0, 0]);
  const imageIndex = Math.abs(page % data?.length);
  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };
  const isDarkMode = themeMode === 'dark';

  return (
    <Box
      sx={{
        mt: 3,
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        py: 6
      }}
    >
      <Image
        priority
        src={bgImage}
        alt="centered-banner"
        layout="fill"
        objectFit="cover"
        draggable="false"
      />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              mb={2}
              maxWidth={{ xs: '100%', md: 400 }}
              lineHeight={1.2}
              textAlign={{ xs: 'center', md: 'left' }}
            >
              Let's explore customer sentiments towards our offerings.
            </Typography>
            <Stack sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Typography
                variant="body1"
                color="text.secondary"
                mb={2}
                maxWidth={{ xs: '100%', md: 550 }}
              >
                Discover what customers are saying about our products. Dive into the feedback on the quality and
                performance of our offerings. Gain insights into how our customers perceive our products and their
                overall satisfaction. Your opinions matter, and we're here to listen..
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={{ xs: 'center', md: 'start' }}
              spacing={3}
              mt={4}
            >
              <Fab
                color="primary"
                aria-label="back"
                size="small"
                onClick={() => paginate(-1)}
                sx={{
                  bgcolor: isDarkMode ? 'primary.main' : 'background.paper',
                  color: isDarkMode ? 'common.white' : 'primary.main',
                  zIndex: 99
                }}
              >
                <IoArrowBackOutline size={24} />
              </Fab>
              <Fab
                color="primary"
                aria-label="forward"
                size="small"
                onClick={() => paginate(1)}
                sx={{
                  bgcolor: isDarkMode ? 'primary.main' : 'background.paper',
                  color: isDarkMode ? 'common.white' : 'primary.main',
                  zIndex: 99
                }}
              >
                <IoArrowForward size={24} />
              </Fab>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <TestimonialCarousel
              images={data}
              direction={direction}
              page={page}
              imageIndex={imageIndex}
              paginate={paginate}
              // IMPORTANT: Ensure that inside TestimonialCarousel (or its child TestimonialDetailsCarousel),
              // the <Image> component does NOT include a "responsive" prop.
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
