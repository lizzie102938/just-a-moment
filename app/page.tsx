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
        data-testid="home-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={'/discovery-2-holder.png'}
        className={classes.videoBackground}
      >
        <source src={'/discovery-2-compressed.mp4'} type={'video/mp4'} />
      </video>

      <Flex
        className={classes.contentOverlay}
        gap={10}
        direction={'column'}
        onClick={() => router.push('/main')}
      >
        <Flex c={'#bac8ff'} align={'center'} gap={15}>
          <Text c={'#bac8ff'} fz={55}>
            Welcome to The Discovery Panel
          </Text>

          <img
            src="/arrow.svg"
            alt="Arrow Icon Home"
            data-testid="Arrow Icon Home"
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
