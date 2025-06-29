// app/layout.tsx
import '@mantine/core/styles.css';
import 'leaflet/dist/leaflet.css';

import { MantineProvider } from '@mantine/core';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Your App Name',
  description: 'Just one moment...',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
