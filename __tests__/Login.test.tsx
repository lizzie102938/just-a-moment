import { expect, test, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';

import { Login } from '@/components';

// TO DO: Refactor with test-utils

const mockBack = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
  usePathname: () => '/some-path',
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

test('Back arrow click navigates back', () => {
  render(
    <MantineProvider>
      <Login />
    </MantineProvider>
  );

  const arrows = screen.getAllByTestId('Arrow Icon Login');
  const arrow = arrows[0];
  arrow.click();

  expect(mockBack).toHaveBeenCalled();
});
