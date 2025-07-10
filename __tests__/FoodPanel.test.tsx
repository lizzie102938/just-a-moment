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

test('Photo Panel renders with correct text if there are photos', () => {
  render(
    <SessionProvider>
      <MantineProvider>
        <FoodPanel
          meals={[]}
          opened={false}
          location={null}
          onClose={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </MantineProvider>
    </SessionProvider>
  );

  expect(screen.getByText(/Photos from/)).toBeInTheDocument();
});

test('Photo Panel renders with correct text if there are no photos', () => {
  render(
    <SessionProvider>
      <MantineProvider>
        {/* <PhotoPanel
          placeName="Test Place"
          country="Test Country"
          photos={[]}
          onClose={vi.fn()}
          onSuccess={vi.fn()}
          onError={vi.fn()}
          location={{ lat: 0, lng: 0 }}
          opened={true}
        /> */}
      </MantineProvider>
    </SessionProvider>
  );

  expect(screen.getByText(/Sorry/)).toBeInTheDocument();
});
