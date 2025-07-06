'use client';

import { useRouter } from 'next/navigation';

import classes from './page.module.scss';
import { Box, Text, useMantineTheme, Flex } from '@mantine/core';

export default function Home() {
  const router = useRouter();
  const theme = useMantineTheme();

  return (
    <Box className={classes.videoBackgroundContainer}>
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={'/discovery-holder-img.png'}
        className={classes.videoBackground}
      >
        <source src={'/discovery-compressed.mp4'} type={'video/mp4'} />
        <source src={'/discovery-compressed.webm'} type={'video/webm'} />
      </video>

      <Flex
        className={classes.contentOverlay}
        gap={10}
        direction={'column'}
        onClick={() => router.push('/main')}
      >
        <Flex c={'#bac8ff'} align={'center'} gap={15}>
          <Text c={'#bac8ff'} fz={60}>
            Welcome to The Discovery Panel
          </Text>

          <img
            src="/arrow.svg"
            alt="Arrow Icon"
            height={50}
            className={classes.arrow}
          />
        </Flex>
        <Text fz={20} c={theme.colors.indigo[2]}>
          Explore the World from your browser
        </Text>
      </Flex>
    </Box>
  );
}
