
const express         = require('express');
const bodyParser      = require('body-parser');
const { MongoClient } = require('mongodb');
const cors            = require('cors');

const path = require('path');
const app  = express();

//
// Allow all clients to use our REST api 
//
app.use( cors() );

const mongoUri       = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName         = process.env.DB_NAME   || 'admin';
const collectionName = process.env.COLLECTION_NAME || 'people';

const port              = process.env.PORT || 3000;

console.log( "Mongo Client trying to connect ..." );

const client = new MongoClient(mongoUri);

console.log( "Mongo Client connected successfully!" );

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


const addEntryToField = (req, res) => {
  const { text } = req.body;
  if (text) {
    res.json({ result: text.toUpperCase() });
  } else {
    res.status(400).send('No text provided');
  }
}

async function queryDatabase(req, res){
// ----------------------------------
  try {
    const db         = client.db(dbName);
    const collection = db.collection(collectionName);
 
    console.log("Db ${dbName} and collection ${collectionName} opened!");

    // Using query parameters as a filter, e.g., ?key=value
    console.log("Trying Query: ",req.query);

    const query = req.query;  // This will automatically parse query parameters into an object
    
    const document = await collection.findOne(query);  // Finds the first document that matches the query
    if (document) {
      res.json(document);
    } else {
      res.status(404).send('No documents found matching the criteria!');
    }
  } catch (error) {
    console.error('Failed to retrieve data:', error);
    res.status(500).send('Error retrieving data');
  }
}

//
// Endpoint to add an entry
//
async function addPerson(req, res){
// ----------------------------------
const { name, givenName, birthday } = req.body;
    try {
        const db         = client.db(dbName);
        const collection = db.collection(collectionName);
        const result     = await collection.insertOne({ name, givenName, birthday });

        console.log(result)
        res.status(201).json(result.insertedId);
    } catch (error) {
        console.error('Failed to insert data:', error);
        res.status(500).send('Error inserting data');
    }
}
//
// Endpoint to search for entries
//
async function findPerson(req, res){
// ----------------------------------
    const query = req.query;
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        console.log(query)
        const people = await collection.find(query).toArray();
        console.log(people)
        if (people.length > 0) {
            res.json(people);
        } else {
            res.status(404).send('No matching documents found');
        }
    } catch (error) {
        console.error('Failed to retrieve data:', error);
        res.status(500).send('Error retrieving data');
    }
}

connectToMongo();

app.post('/toupper'    , addEntryToField )
app.get('/api/search'  , queryDatabase );
app.get('/api/people'  , findPerson );
app.post('/api/people' , addPerson );


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

