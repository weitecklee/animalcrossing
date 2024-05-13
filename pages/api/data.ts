import { NextApiRequest, NextApiResponse } from 'next';
import getData from '../../lib/getData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const data = await getData();
  const {
    mongoData,
    speciesData,
    personalityData,
    genderData,
    photoData,
    photoStats,
    currentResidents,
    islandmatesData,
    eventData,
  } = data;

  res.status(200).json({
    mongoData,
    speciesData,
    personalityData,
    genderData,
    photoData,
    photoStats,
    currentResidents,
    islandmatesData,
    eventData,
  });
}