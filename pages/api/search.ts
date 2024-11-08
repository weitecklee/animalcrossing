import { NextApiRequest, NextApiResponse } from 'next';
import searchMongo from '../../lib/searchMongo';
import { AdvancedSearchOptions, SearchOptions } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const {
    searchOptions,
    advancedSearchOptions,
  }: {
    searchOptions: SearchOptions;
    advancedSearchOptions: AdvancedSearchOptions;
  } = req.body;
  const results = await searchMongo(searchOptions, advancedSearchOptions);

  res.status(200).json({ results });
}
