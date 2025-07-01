import React from 'react';
import Tooltip from '../Tooltip/Tooltip';
import { useRouter } from 'next/navigation';
import classes from './BackArrow.module.scss';

const BackArrow = () => {
  const router = useRouter();
  return (
    <Tooltip label={'Go back'}>
      <img
        src="/back-arrow.svg"
        alt="Back Arrow"
        height={40}
        className={classes.backArrow}
        onClick={() => router.back()}
      />
    </Tooltip>
  );
};

export default BackArrow;
