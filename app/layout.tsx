// app/layout.tsx
import '@mantine/core/styles.css';
import 'leaflet/dist/leaflet.css';

import { MantineProvider } from '@mantine/core';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'The Discovery Panel',
  description: 'Explore the World from Your Browser',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
