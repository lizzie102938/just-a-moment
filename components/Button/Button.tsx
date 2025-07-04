'use client';

import React from 'react';
import { Button as MantineButton, useMantineTheme } from '@mantine/core';
import classes from './Button.module.scss';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}
const Button = ({ onClick, disabled, label }: ButtonProps) => {
  const theme = useMantineTheme();
  return (
    <MantineButton
      //   bg={theme.colors.indigo[3]}
      className={classes.button}
      bg={theme.colors.gray[7]}
      radius={0}
      c={'white'}
      disabled={disabled}
      onClick={onClick}
      w={170}
    >
      {label}
    </MantineButton>
  );
};

export default Button;
