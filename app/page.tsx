'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
// import GuessThePlace from '@/components/GuessThePlace';
// import { Globe } from '@/components/Globe/Globe';
import classes from './page.module.scss';
import { Box, Text, useMantineTheme, Flex } from '@mantine/core';

const MapItem = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  const theme = useMantineTheme();
  const [globeClicked, setGlobeClicked] = useState(false);

  const [photos, setPhotos] = useState<any[]>([]);
  const [placeName, setPlaceName] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  // Reusable fetch function
  const fetchPhotosByCoords = async (lat: number, lng: number) => {
    console.log(lat, lng);
    try {
      const res = await fetch(`/api/photos?lat=${lat}&lng=${lng}`);
      if (!res.ok) {
        console.error('Failed to fetch photos', await res.text());
        return { photos: [], placeName: null, country: null };
      }
      const data = await res.json();
      return {
        photos: data.photos,
        placeName: data.placeName,
        country: data.country,
      };
    } catch (err) {
      console.error('Fetch error:', err);
      return { photos: [], placeName: null, country: null };
    }
  };

  // Generate random lat/lng on globe click, fetch photos, and show GuessThePlace
  const handleGlobeClick = async () => {
    // Random latitude between -90 and 90
    const lat = Math.random() * 180 - 90;
    // Random longitude between -180 and 180
    const lng = Math.random() * 360 - 180;

    console.log('Random coords for GuessThePlace:', { lat, lng });

    const { photos, placeName, country } = await fetchPhotosByCoords(lat, lng);
    setPhotos(photos);
    setPlaceName(placeName);
    setCountry(country);

    setGlobeClicked(true);
  };

  return (
    // <Box className={classes.homePage}>
    //   <Text
    //     ta={'center'}
    //     c={theme.colors.indigo[1]}
    //     className={classes.title}
    //     fz={80}
    //   >
    //     Welcome to The Discovery Panel
    //   </Text>
    //   <Box onClick={handleGlobeClick} style={{ cursor: 'pointer' }}>
    //     <Globe />
    //   </Box>
    //   {globeClicked && photos.length > 0 && placeName && country && (
    //     <GuessThePlace
    //       photos={photos}
    //       placeName={placeName}
    //       country={country}
    //       onClose={() => setGlobeClicked(false)}
    //     />
    //   )}
    // </Box>

    <Box className={classes.videoBackgroundContainer}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className={classes.videoBackground}
      >
        <source src="/discovery.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Flex className={classes.contentOverlay} gap={10} direction="column">
        <Flex c={'#bac8ff'} align={'center'} gap={15}>
          <Text c={'#bac8ff'} fz={60}>
            Welcome to The Discovery Panel
          </Text>
          <Link href="/main" passHref color={'#bac8ff'}>
            <img
              src="/arrow.svg"
              alt="Arrow Icon"
              height={50}
              className={classes.arrow}
            />
          </Link>
        </Flex>
        <Text fz={20} c={theme.colors.indigo[2]}>
          Explore the World from your browser
        </Text>
      </Flex>
    </Box>
  );
}
