import type { NextApiRequest, NextApiResponse } from 'next';
import { countryToAdjective } from './mapping';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { country } = req.query;

  if (!country || typeof country !== 'string') {
    return res.status(400).json({ error: 'Country parameter is required' });
  }

  const adjective = countryToAdjective[country.trim()];

  if (!adjective) {
    return res
      .status(400)
      .json({ error: `No adjective found for country '${country}'` });
  }

  try {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(adjective)}`;
    const response = await fetch(url);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: 'Failed to fetch meals' });
    }

    const data = await response.json();

    if (!data.meals) {
      return res
        .status(404)
        .json({ error: `No meals found for country '${country}'` });
    }

    res.status(200).json({ meals: data.meals });
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
