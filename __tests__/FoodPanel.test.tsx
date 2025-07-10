import { expect, test, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';

import { FoodPanel } from '@/components';
import { SessionProvider } from 'next-auth/react';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/some-path',
}));

vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: { name: 'Test User', email: 'test@example.com' },
    },
    status: 'authenticated',
  }),
  SessionProvider: ({ children }: any) => children,
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

test('Food Panel renders with correct text if there are meals', () => {
  render(
    <SessionProvider>
      <MantineProvider>
        <FoodPanel
          meals={[{ strMeal: 'Pizza', strMealThumb: 'pizza.jpg', idMeal: '1' }]}
          opened={true}
          location={{ lat: 0, lng: 0 }}
          onClose={(): void => {}}
        />
      </MantineProvider>
    </SessionProvider>
  );

  expect(screen.getByText(/Dishes from/)).toBeInTheDocument();
});

test('Food Panel renders with correct text if there are no meals', () => {
  render(
    <SessionProvider>
      <MantineProvider>
        <FoodPanel
          meals={[]}
          opened={true}
          location={{ lat: 0, lng: 0 }}
          onClose={(): void => {}}
        />
      </MantineProvider>
    </SessionProvider>
  );

  expect(screen.getByText(/Sorry/)).toBeInTheDocument();
});
