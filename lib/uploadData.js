require('dotenv').config();
const data = require('./combinedData');

const payload = {
  dataSource: 'AnimalCrossing',
  database: 'lasagnark',
  collection: 'data',
  documents: data.data,
};

fetch(`${process.env.api_url}/action/insertMany`, {
  method: 'POST',
  headers: {
    'api-key': `${process.env.api_key}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
