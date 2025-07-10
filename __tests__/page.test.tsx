import { expect, test, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';

import Home from '../app/page';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

test('Home page text renders', () => {
  render(
    <MantineProvider>
      <Home />
    </MantineProvider>
  );

  expect(
    screen.getByText('Welcome to The Discovery Panel')
  ).toBeInTheDocument();
  expect(
    screen.getByText('Explore the World from your browser')
  ).toBeInTheDocument();
});

test('Arrow renders', async () => {
  render(
    <MantineProvider>
      <Home />
    </MantineProvider>
  );

  const arrows = screen.getAllByAltText('Arrow Icon Home');
  expect(arrows.length).toBeGreaterThan(0);
});

test('Video renders', () => {
  render(
    <MantineProvider>
      <Home />
    </MantineProvider>
  );

  const video = document.querySelector('video');
  expect(video).toBeInTheDocument();
});

test('Arrow click navigates to /main', () => {
  render(
    <MantineProvider>
      <Home />
    </MantineProvider>
  );

  const arrows = screen.getAllByTestId('Arrow Icon Home');
  const arrow = arrows[0];
  arrow.click();

  expect(mockPush).toHaveBeenCalledWith('/main');
});
