const { MongoClient } = require('mongodb');
const { env } = require('~/config/environment');
let dbInstance = null;
const uri = env.MONGODB_URI;

export const connectDB = async () => {
    const client = new MongoClient(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    await client.connect();
    //assign clientDB to dbInstance
    dbInstance = client.db(env.DATABASE_NAME);
};

// Get database instance
export const getDB = () => {
    if (!dbInstance) throw new Error('Must connect to DB first!');
    return dbInstance;
};
