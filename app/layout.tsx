import '@mantine/core/styles.css';
import 'leaflet/dist/leaflet.css';

import { Providers } from '../components/Providers/Providers';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'The Discovery Panel',
  description: 'Explore the World from Your Browser',
  icons: {
    icon: '/globe-fav.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/user-bg.avif" />
        <link rel="preload" as="image" href="/desert.avif" />
        <link rel="preload" as="video" href="/disovery.mp4" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
