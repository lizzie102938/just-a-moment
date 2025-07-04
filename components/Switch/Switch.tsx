'use client';

import { useMantineTheme, Switch as MantineSwitch } from '@mantine/core';

interface SwitchProps {
  label: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Switch = ({ label, checked, onChange }: SwitchProps) => {
  const theme = useMantineTheme();
  return (
    <MantineSwitch
      onChange={onChange}
      checked={checked}
      label={label}
      color={theme.colors.indigo[2]}
      size={'md'}
      radius={'lg'}
      styles={{
        label: {
          fontSize: '14px',
          fontWeight: 800,
          color: theme.colors.indigo[3],
        },
      }}
    />
  );
};

export default Switch;
