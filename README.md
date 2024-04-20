# Open Data Project

## API Server
## Environment

### Configuring access to mongo db server:
- MONGO_URI = [mongodb://localhost:27017]
- DB_NAME = [mapping]
- COLLECTION_NAME = [people]
- PORT = [3000]
- SERVE_DIR = [.]
- EXTERNAL_DIR = [/external]

- If the next is set, all the above will be ignored:
    Parameter | Default Value 
  :------------|:---------------
   OD_CONFIG_MONGODB_SERVER   | 'mongodb-server' 
   OD_CONFIG_MONGODB_PORT   | 'mongodb-server' 
   OD_CONFIG_MONGODB_ADMINUSERNAME   | 'mongodb-server' 
   OD_CONFIG_MONGODB_ADMINPASSWORD   | 'mongodb-server' 
   OD_CONFIG_MONGODB_DB_NAME   | 'mongodb-server' 
   OD_CONFIG_MONGODB_COLLECTION_NAME   | 'mongodb-server' 


let secret = ''
if( typeof mongodb_user != 'undefined' ){
   secret = mongodb_user+':'+mongodb_passwd+'@' ;
}

const mongoUri = process.env.OD_CONFIG_MONGODB_URI || 'mongodb://'+secret+mongodb_server+':'+mongodb_port ;

console.log( "Mongo Client trying to connect to "+mongoUri );

const port           = process.env.OD_CONFIG_PORT         || 3000 ;
const site_url       = process.env.OD_CONFIG_SITE_BASEURL || '/' ;

## Volumes

- -v [External Directory]:/external
