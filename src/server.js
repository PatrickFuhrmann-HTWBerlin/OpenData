
const express         = require('express');
const bodyParser      = require('body-parser');
const { MongoClient } = require('mongodb');

const path = require('path');
const app  = express();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName   = process.env.DB_NAME   || 'mapping';
const collectionName = process.env.COLLECTION_NAME || 'people';


const port              = process.env.PORT || 3000;
const serveDirectory    = process.env.SERVE_DIR || '.';
const externalDirectory = process.env.EXTERNAL_DIR || '/external';

console.log( "Mongo Client trying to connect" );

const client = new MongoClient(mongoUri);

console.log( "Mongo Client connected" );

app.use(express.static(serveDirectory));

console.log( "Static internal regiesterd");

app.use('/external', express.static(externalDirectory));
console.log( "Static external regiesterd");

app.use(bodyParser.json()); // For parsing application/json

console.log( "bodyParser.json()");

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error('Connection to MongoDB failed:', error);
  }
}

connectToMongo();

const addEntryToField = (req, res) => {
  const { text } = req.body;
  if (text) {
    res.json({ result: text.toUpperCase() });
  } else {
    res.status(400).send('No text provided');
  }
}

async function queryDatabase(req, res){

  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
 
    console.log("Db and collection opend");

    // Using query parameters as a filter, e.g., ?key=value
    console.log("Trying: ",req.query);
    const query = req.query;  // This will automatically parse query parameters into an object
    console.log("query : ",query)

    const document = await collection.findOne(query);  // Finds the first document that matches the query
    if (document) {
      res.json(document);
    } else {
      res.status(404).send('No documents found matching the criteria');
    }
  } catch (error) {
    console.error('Failed to retrieve data:', error);
    res.status(500).send('Error retrieving data');
  }
}

app.post('/toupper', addEntryToField )
app.get('/api/db', queryDatabase );


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Serving content from ./${serveDirectory}/`);
  console.log(`External content available from ${externalDirectory}`);
});

