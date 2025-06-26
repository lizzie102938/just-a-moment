import { useMantineTheme, Switch as MantineSwitch } from '@mantine/core';

interface SwitchProps {
  label: string;
}

const Switch = ({ label }: SwitchProps) => {
  const theme = useMantineTheme();
  return (
    <MantineSwitch
      label={label}
      color={theme.colors.indigo[3]}
      size="md"
      radius="lg"
      styles={{
        label: {
          fontSize: '14px',
          fontWeight: 500,
          color: theme.colors.indigo[1],
        },
      }}
    />
  );
};

export default Switch;
