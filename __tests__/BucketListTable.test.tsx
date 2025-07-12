import { expect, test, vi, beforeAll, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';

import { BucketListTable } from '@/components';
import { SessionProvider } from 'next-auth/react';

let mockSessionData: any = null;
let mockSessionStatus: 'authenticated' | 'unauthenticated' | 'loading' =
  'unauthenticated';

const mockBack = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
  usePathname: () => '/some-path',
}));

vi.mock('next-auth/react', async () => {
  return {
    ...(await vi.importActual('next-auth/react')),
    useSession: vi.fn(() => ({
      data: mockSessionData,
      status: mockSessionStatus,
    })),
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

afterEach(() => {
  cleanup();
  mockSessionData = null;
  mockSessionStatus = 'unauthenticated';
  vi.clearAllMocks();
});

test('Back arrow click navigates back', () => {
  mockSessionData = {
    user: { id: '123', name: 'Test User', email: 'test@example.com' },
  };
  mockSessionStatus = 'authenticated';

  render(
    <MantineProvider>
      <BucketListTable />
    </MantineProvider>
  );

  const arrow = screen.getByTestId('Arrow Icon Bucket');
  arrow.click();

  expect(mockBack).toHaveBeenCalled();
});

vi.mock('@/utils/fetchFunctions', () => ({
  fetchBucketList: vi.fn().mockResolvedValue([
    {
      id: '1',
      country: 'Italy',
      place_name: 'Rome',
      reason: 'Food',
      longitude: 12.5,
      latitude: 41.9,
    },
  ]),
  deleteBucketListItem: vi.fn(),
  fetchPhotosByCoords: vi.fn(),
  fetchFoodByCoords: vi.fn(),
  fetchRadioByCoords: vi.fn(),
}));

vi.mock('@/utils/fetchFunctions', async () => {
  const original = await vi.importActual('@/utils/fetchFunctions');
  return {
    ...original,
    fetchBucketList: vi.fn().mockResolvedValue([]),
  };
});

test('Bucket List does not render if there are no items and alerts user to empty state', async () => {
  mockSessionData = {
    user: { id: '123', name: 'Test', email: 'test@test.com' },
  };
  mockSessionStatus = 'authenticated';

  render(
    <MantineProvider>
      <SessionProvider>
        <BucketListTable />
      </SessionProvider>
    </MantineProvider>
  );

  expect(
    await screen.findByText(/You have nothing in your bucket list yet/)
  ).toBeInTheDocument();
});

test('If user is not logged in they are shown a link to login', () => {
  mockSessionData = null;
  mockSessionStatus = 'unauthenticated';

  render(
    <MantineProvider>
      <SessionProvider>
        <BucketListTable />
      </SessionProvider>
    </MantineProvider>
  );

  expect(
    screen.getByText(/Please log in to see your bucket list/)
  ).toBeInTheDocument();
});
