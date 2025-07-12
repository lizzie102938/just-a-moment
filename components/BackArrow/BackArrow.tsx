'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mantine/core';
import { Tooltip } from '@/components';

import classes from './BackArrow.module.scss';

interface BackArrowProps {
  isLoginPage?: boolean;
}

const BackArrow = ({ isLoginPage }: BackArrowProps) => {
  const router = useRouter();
  return (
    <Box>
      <Tooltip label={'Go back'}>
        <img
          src="/back-arrow.svg"
          alt="Back Arrow"
          height={40}
          className={classes.backArrow}
          onClick={() => router.back()}
          data-testid={`Arrow Icon ${isLoginPage ? 'Login' : 'Bucket'}`}
        />
      </Tooltip>
    </Box>
  );
};

export default BackArrow;
