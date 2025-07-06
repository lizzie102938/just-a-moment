'use client';

import { useState } from 'react';
import {
  Badge as MantineBadge,
  TextInput,
  Group,
  useMantineTheme,
} from '@mantine/core';
import classes from './Badge.module.scss';
import classNames from 'classnames';

type BadgeProps = {
  label: string | React.ReactNode;
  hasInput?: boolean;
  onSearch?: (query: string) => void;
  type: 'simple' | 'input';
};

const Badge = ({ label, hasInput = false, onSearch, type }: BadgeProps) => {
  const [inputValue, setInputValue] = useState('');
  const theme = useMantineTheme();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = (e.target as HTMLInputElement).value;
      if (onSearch) {
        onSearch(input);
        setInputValue('');
      }
    }
  };

  return (
    <MantineBadge
      h={type === 'simple' ? 35 : 50}
      ta="center"
      mt={0}
      size={type === 'simple' ? 'lg' : 'md'}
      radius={0}
      variant="light"
      bg={theme.colors.gray[7]}
      fz={12}
      c={'white'}
      fw={'bold'}
      className={classNames(classes.badge, {
        [classes.inputBadge]: type === 'input',
      })}
    >
      <Group gap={'xs'} align={'center'} wrap={'nowrap'}>
        {label}
        {hasInput && (
          <TextInput
            size={'xs'}
            w={200}
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            placeholder={'e.g. Paris or Eiffel Tower'}
          />
        )}
      </Group>
    </MantineBadge>
  );
};

export default Badge;
