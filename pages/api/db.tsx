import { NextApiRequest, NextApiResponse } from 'next';

const payload = {
  dataSource: 'AnimalCrossing',
  database: 'lasagnark',
  collection: 'history',
  filter: {},
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return fetch(`${process.env.api_url}/action/find`, {
    method: 'POST',
    headers: {
      'api-key': `${process.env.api_key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log('Error fetching from MongoDB Data API', err);
      res.status(404);
    })
}
