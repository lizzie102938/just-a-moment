// lib/theme.ts
import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  fontFamily: 'Roboto, sans-serif',
  primaryColor: 'primaryColor',

  colors: {
    // primaryColor: ['#e1e0f9'],
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
    green: [
      '#e9ecd4',
      '#d4e1c2',
      '#c3d6a3',
      '#b0c982',
      '#9eb866',
      '#808000',
      '#677b4d',
      '#4b5320',
      '#3a4b22',
      '#2c3519',
    ],
    gray: [
      '#f8f9fa',
      '#f1f3f5',
      '#e9ecef',
      '#dee2e6',
      '#ced4da',
      '#adb5bd',
      '#868e96',
      '#495057',
      '#343a40',
      '#212529',
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
