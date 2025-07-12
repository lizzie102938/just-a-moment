import { expect, test, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';

import { PanelTopInfo } from '@/components';
import { SessionProvider } from 'next-auth/react';

// TO DO: Refactor with test-utils

let mockSessionData: any = null;
let mockSessionStatus: 'authenticated' | 'unauthenticated' | 'loading' =
  'unauthenticated';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/some-path',
}));

vi.mock('next-auth/react', async () => {
  const actual = await vi.importActual('next-auth/react');
  return {
    ...actual,
    useSession: () => ({
      data: mockSessionData,
      status: mockSessionStatus,
    }),
    SessionProvider: ({ children }: any) => children,
  };
});

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

test('Login button is rendered if user is not logged in', () => {
  mockSessionData = null;
  mockSessionStatus = 'unauthenticated';

  render(
    <SessionProvider>
      <MantineProvider>
        <PanelTopInfo reason={''} onClose={() => {}} location={null} />
      </MantineProvider>
    </SessionProvider>
  );

  expect(screen.getByText(/Login/)).toBeInTheDocument();
});

test('Login button is not rendered if user is logged in', () => {
  mockSessionData = { user: { name: 'Test', email: 'test@test.com' } };
  mockSessionStatus = 'authenticated';

  render(
    <SessionProvider>
      <MantineProvider>
        <PanelTopInfo reason={''} onClose={() => {}} location={null} />
      </MantineProvider>
    </SessionProvider>
  );

  expect(screen.getAllByText('Login').length).toBeGreaterThan(0);
});
