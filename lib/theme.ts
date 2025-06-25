// lib/theme.ts
import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  fontFamily: 'Roboto, sans-serif',
  primaryColor: '#e1e0f9', // Use your brand color
  colors: {
    indigo: [
      '#e1e0f9',
      '#dbe4ff',
      '#bac8ff',
      '#91a7ff',
      '#748ffc',
      '#5c7cfa',
      '#4c6ef5',
      '#4263eb',
      '#3b5bdb',
      '#364fc7',
    ],
  },
  defaultRadius: 'md',
  //   spacing: {
  //     xs: 4,
  //     sm: 8,
  //     md: 16,
  //     lg: 24,
  //     xl: 32,
  //   },
  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: '32' },
      h2: { fontSize: '28' },
    },
  },
};
