import React from 'react';
import { Tooltip as MantineTooltip, useMantineTheme } from '@mantine/core';

interface TooltipProps {
  children: React.ReactNode;
  label: string;
}

const Tooltip = ({ children, label }: TooltipProps) => {
  const theme = useMantineTheme();

  return (
    <MantineTooltip
      label={label}
      withArrow
      position={'bottom'}
      color={theme.colors.indigo[2]}
      c={theme.colors.gray[7]}
      fw={600}
      fz={12}
      zIndex={1050}
      offset={12}
    >
      {children}
    </MantineTooltip>
  );
};

export default Tooltip;
