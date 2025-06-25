import { useState } from 'react';
import { Badge as MantineBadge, TextInput, Group } from '@mantine/core';
import classes from './Badge.module.scss';
import { theme } from '@/lib/theme';

type BadgeProps = {
  label: string;
  hasInput?: boolean;
  onSearch?: (query: string) => void;
};

const Badge = ({ label, hasInput = false, onSearch }: BadgeProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = (e.target as HTMLInputElement).value;
      if (onSearch) {
        onSearch(input);
      }
    }
  };

  return (
    <MantineBadge
      h={50}
      ta="center"
      mt={0}
      size="lg"
      radius="sm"
      variant="light"
      bg={theme.primaryColor}
      c="gray"
      fw={'normal'}
      className={classes.badgeText}
    >
      <Group gap="xs" align="center">
        {label}
        {hasInput && (
          <TextInput
            size="xs"
            w={200}
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Paris"
          />
        )}
      </Group>
    </MantineBadge>
  );
};

export default Badge;
