import React from 'react';
import { Loader as MantineLoader, useMantineTheme } from '@mantine/core';

const Loader = () => {
  const theme = useMantineTheme();
  return (
    <div
      style={{
        color: 'pink',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        // backgroundColor: 'rgba(255, 255, 255, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000, // Make sure it's above the rest
      }}
    >
      {' '}
      <MantineLoader color={theme.colors.gray[7]} />
    </div>
  );
};

export default Loader;
