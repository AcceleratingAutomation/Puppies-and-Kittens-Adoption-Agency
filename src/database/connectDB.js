const { MongoClient, ServerApiVersion } = require("mongodb");
const debug = require("debug")("app:db");

const port = process.env.PORT || 27017;
const uri = `mongodb://localhost:${port}`;
const dbName = "dev-puppies-and-kittens";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectDB() {
  try {
    await client.connect();
    debug(`MongoDB is running at ${uri}`);
    db = client.db(dbName);
  } catch (err) {
    debug(`Error: ${err}`);
    throw err;
  }
}

connectDB().catch(debug.dir);

module.exports = {
  getDb: () => db,
};
