import { countryAdjectiveMapping } from '../../../utils/countryAdjectiveMapping';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get('country');

  if (!country || typeof country !== 'string') {
    return NextResponse.json(
      { error: 'Country parameter is required' },
      { status: 400 }
    );
  }

  const adjective = countryAdjectiveMapping[country.trim()];

  if (!adjective) {
    return NextResponse.json(
      { error: `No adjective found for country '${country}'` },
      { status: 400 }
    );
  }

  try {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(adjective)}`;
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch meals' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(data, 'data');

    if (!data.meals) {
      return NextResponse.json(
        { error: `No meals found for country '${country}'` },
        { status: 404 }
      );
    }

    return NextResponse.json({ meals: data.meals, country });
  } catch (error) {
    console.error('Error fetching meals:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
