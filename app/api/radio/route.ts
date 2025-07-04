import { NextRequest, NextResponse } from 'next/server';

const radioBrowserServers = [
  'https://de1.api.radio-browser.info',
  'https://nl1.api.radio-browser.info',
  'https://fr1.api.radio-browser.info',
  'https://fi1.api.radio-browser.info',
  'https://at1.api.radio-browser.info',
  'https://us1.api.radio-browser.info',
];

async function fetchFromRadioBrowser(endpoint: string) {
  const shuffledServers = [...radioBrowserServers].sort(
    () => 0.5 - Math.random()
  );

  for (const base of shuffledServers) {
    try {
      const res = await fetch(`${base}/json/${endpoint}`, {
        headers: {
          'User-Agent': 'thediscoverypanel/1.0',
        },
      });

      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (err) {
      console.warn(`Failed to fetch from ${base}, trying next...`);
    }
  }

  throw new Error('All Radio Browser servers failed');
}

export async function GET(req: NextRequest) {
  const country = req.nextUrl.searchParams.get('country');

  if (!country) {
    return NextResponse.json(
      { error: 'Missing country parameter' },
      { status: 400 }
    );
  }

  try {
    const stations = await fetchFromRadioBrowser(
      `stations/bycountry/${encodeURIComponent(country)}`
    );

    const playable = stations.filter(
      (station: any) => station.url && station.url.length > 0
    );

    return NextResponse.json(playable.slice(0, 5));
  } catch (error) {
    console.error('Radio API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stations from all servers' },
      { status: 500 }
    );
  }
}

// export async function GET(req: NextRequest) {
//   const country = req.nextUrl.searchParams.get('country');

//   if (!country) {
//     return NextResponse.json(
//       { error: 'Missing country parameter' },
//       { status: 400 }
//     );
//   }

//   try {
//     const res = await fetch(
//       `https://api.radio-browser.info/json/stations/bycountry/${encodeURIComponent(country)}`
//     );

//     if (!res.ok) {
//       return NextResponse.json(
//         { error: 'Failed to fetch stations' },
//         { status: 500 }
//       );
//     }

//     const stations = await res.json();

//     const playable = stations.filter(
//       (station: any) => station.url && station.url.length > 0
//     );

//     return NextResponse.json(playable.slice(0, 5));
//   } catch (error) {
//     console.error(
//       'Radio API error:',
//       error instanceof Error ? error.stack : error
//     );
//     return NextResponse.json(
//       { error: 'Internal Server Error' },
//       { status: 500 }
//     );
//   }
// }
