# Open Data Project

## API Server
## Environment

### Configuring access to mongo db server:

    Parameter | Default Value 
  :------------|:---------------
   OD_CONFIG_MONGODB_SERVER   | 'mongodb-server' 
   OD_CONFIG_MONGODB_PORT   | 'mongodb-server' 
   OD_CONFIG_MONGODB_ADMINUSERNAME   | 'mongodb-server' 
   OD_CONFIG_MONGODB_ADMINPASSWORD   | 'mongodb-server' 
   OD_CONFIG_MONGODB_DB_NAME   | 'mongodb-server' 
   OD_CONFIG_MONGODB_COLLECTION_NAME   | 'mongodb-server'

 If the  _OD_CONFIG_MONGODB_URI_ is set, the above values are ignored.
   Parameter | Default Value | Syntax
  :------------|:--------------- |:--------
   OD_CONFIG_MONGODB_URI   | '' | mongodb://[<username>:<password>@]<hostname>:<port>
 
### Configuring API web service:

    Parameter | Default Value 
  :------------|:---------------
   OD_CONFIG_PORT  | 3000 
   OD_CONFIG_SITE_BASEURL | '/' 



