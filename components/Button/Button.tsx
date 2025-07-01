import React from 'react';
import { Button as MantineButton, useMantineTheme } from '@mantine/core';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}
const Button = ({ onClick, disabled, label }: ButtonProps) => {
  const theme = useMantineTheme();
  return (
    <MantineButton
      bg={theme.colors.indigo[2]}
      c={theme.colors.gray[7]}
      disabled={disabled}
      onClick={onClick}
      w={170}
    >
      {label}
    </MantineButton>
  );
};

export default Button;
