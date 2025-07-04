'use client';

import React from 'react';
import { Loader as MantineLoader, useMantineTheme } from '@mantine/core';
import classes from './Loader.module.scss';

const Loader = () => {
  const theme = useMantineTheme();
  return (
    <div className={classes.loader}>
      <MantineLoader color={theme.colors.gray[7]} />
    </div>
  );
};

export default Loader;
