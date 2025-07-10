// utils/test-utils.tsx
import { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';

// Mock next/navigation hooks globally for your tests:
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/mock-path',
}));

const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider session={null}>
      <MantineProvider>{children}</MantineProvider>
    </SessionProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
