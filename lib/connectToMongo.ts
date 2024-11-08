import { Db, MongoClient, ServerApiVersion } from 'mongodb';

let client: MongoClient;

async function connectToMongo(): Promise<Db> {
  try {
    if (!client) {
      client = new MongoClient(process.env.MONGODB_URI!, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
      await client.connect();
    }
    return client.db('lasagnark');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
}

export default connectToMongo;
