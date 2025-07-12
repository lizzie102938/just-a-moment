// __test-utils__/testSetup.ts
import { vi } from 'vitest';
// import { render } from '@testing-library/react';
// import { MantineProvider } from '@mantine/core';
// import { SessionProvider } from 'next-auth/react';

export let mockSessionData: any = null;
export let mockSessionStatus: 'authenticated' | 'unauthenticated' | 'loading' =
  'unauthenticated';

export const mockBack = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
  usePathname: () => '/mocked-path',
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

export const setupMatchMedia = () => {
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
};

// export const renderWithProviders = (ui: React.ReactNode) => {
//   return render(
//     <MantineProvider>
//       <SessionProvider>
//         {ui}
//       </SessionProvider>
//     </MantineProvider>
//   );
// };

export const resetSession = () => {
  mockSessionData = null;
  mockSessionStatus = 'unauthenticated';
  vi.clearAllMocks();
};
