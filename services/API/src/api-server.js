
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

const mongodb_server     =  process.env.OD_CONFIG_MONGODB_SERVER          || 'mongodb-server' ;
const mongodb_port       =  process.env.OD_CONFIG_MONGODB_PORT            || 27017 ;
const mongodb_user       =  process.env.OD_CONFIG_MONGODB_ADMINUSERNAME   || 'admin' ;
const mongodb_passwd     =  process.env.OD_CONFIG_MONGODB_ADMINPASSWORD   || 'secret' ;
const mongodb_db         =  process.env.OD_CONFIG_MONGODB_DB_NAME         || 'opendata'
const mongodb_collection =  process.env.OD_CONFIG_MONGODB_COLLECTION_NAME || 'people'

let secret = ''
if( typeof mongodb_user != 'undefined' ){
   secret = mongodb_user+':'+mongodb_passwd+'@' ;
}

const mongoUri = process.env.OD_CONFIG_MONGODB_URI || 'mongodb://'+secret+mongodb_server+':'+mongodb_port ;

console.log( "Mongo Client trying to connect to "+mongoUri );

const port           = process.env.OD_CONFIG_PORT         || 3000 ;
const site_url       = process.env.OD_CONFIG_SITE_BASEURL || '/' ;

const client = new MongoClient(mongoUri);

console.log( "Mongo Client connected successfully!" );

app.use(bodyParser.json()); // For parsing application/json

// console.log( "bodyParser.json()");
// 
//  _   _        _                    
// | | | |  ___ | | _ __    ___  _ __ 
// | |_| | / _ \| || '_ \  / _ \| '__|
// |  _  ||  __/| || |_) ||  __/| |   
// |_| |_| \___||_|| .__/  \___||_|   
//                 |_|                
// 
async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error('Connection to MongoDB failed:', error);
  }
}


function printRequest( req ){
// ----------------------------------
   console.log( "----------------------------------------");
   console.log( "Base URL:     ",req.baseUrl);
   console.log( "Original URL: ",req.originalUrl);
   console.log( "Body:         ",req.body);
   console.log( "Query:        ",req.query);
   console.log( "Route:        ",req.route);
   console.log( "----------------------------------------");
}
function isValidDate(dateStr) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return false;
  }
  
  const date = new Date(dateStr);
  const timestamp = date.getTime();

  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
      return false;
  }

  return date;
}
//  ____      _ _ _                _        
// / ___|__ _| | | |__   __ _  ___| | _____ 
// | |   / _` | | | '_ \ / _` |/ __| |/ / __|
// | |__| (_| | | | |_) | (_| | (__|   <\__ \
// \____\__,_|_|_|_.__/ \__,_|\___|_|\_\___/
//                                          

async function testRequest(req, res){
// ----------------------------------
    try {
      printRequest(req);
    } catch (error) {
      console.error('Failed: ', error);
    }
    res.status(200).send('OK!\n');
}
//
// Endpoint to add an entry
//
async function addPerson(req, res){
// ----------------------------------
let { name, givenName, birthday } = req.body;
    try {
        const db         = client.db(mongodb_db);
        const collection = db.collection(mongodb_collection);

        printRequest(req);
        console.log("New Entry Request: ","Name=",name,";givenName=",givenName,";birthday=",birthday);

        birthday = isValidDate(birthday) ;
        if( ! birthday  ){
          console.log("Is not a valid date : ",birthday);
          res.status(500).send("Is not a valid date!");
          return;
        }

        qry = { name , givenName , birthday } 

        console.log("Query: ",qry);

        const personFound = await collection.findOne( qry );

        if( personFound != null ){
          console.log("Person already exists!")
          res.status(500).send("Entry already exists!");
          return;
        }
        
        console.log( "Inserting: ", qry  );

        const result  = await collection.insertOne( qry );

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
    printRequest(req);

try {
        const db         = client.db(mongodb_db);
        const collection = db.collection(mongodb_collection);

        console.log("Opening: Db <"+mongodb_db+"> and collection <"+mongodb_collection+">!");
        let birthday = null ;
        if( birthday = query['birthday'] ){
           console.log("Birthday used: "+birthday)
           birthday = isValidDate(birthday) ;
           
           console.log("Birthday converted: "+birthday)

           if( ! birthday ){
               res.status(404).send('Wrongly formated birthday!');
               return 
           }else{
               query['birthday'] = birthday ;
           }
        }
        console.log(" Query : "+query);
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
async function deletePerson(req, res){
  // ----------------------------------
      const query = req.query;
      printRequest(req);
  
  try {
          const db         = client.db(mongodb_db);
          const collection = db.collection(mongodb_collection);
  
          console.log("Opening: Db <"+mongodb_db+"> and collection <"+mongodb_collection+">!");
          let birthday = null ;
          if( birthday = query['birthday'] ){
             console.log("Birthday used: "+birthday)
             birthday = isValidDate(birthday) ;
             
             console.log("Birthday converted: "+birthday)
  
             if( ! birthday ){
                 res.status(404).send('Wrongly formated birthday!');
                 return 
             }else{
                 query['birthday'] = birthday ;
             }
          }
          if( !( query['name'] && query['givenName'] && query['birthday'] ) ){
              console.log("Not enough arguments: "+query)
              res.status(404).send('Person not found; Nothing deleted!')
              return ;
          }
          console.log(" Query : "+query);
          const r = await collection.deleteOne(query) ;

          res.json( r )
                    
      } catch (error) {
          console.error('Failed to retrieve data:', error);
          res.status(500).send('Error retrieving data');
      }
  }
  

//  __   _       
// |  \/  | __ _(_)_ __  
// | |\/| |/ _` | | '_ \ 
// | |  | | (_| | | | | |
// |_|  |_|\__,_|_|_| |_|
//                      

connectToMongo();

app.get(site_url+'api/test'     , testRequest );
app.post(site_url+'api/test'    , testRequest );
app.delete(site_url+'apitest'  , testRequest );
app.get(site_url+'api/people'   , findPerson );
app.post(site_url+'api/people'  , addPerson );
app.delete(site_url+'api/people' , deletePerson );


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

