# Open Data Project

## API Server
## Environment

### Configuring access to mongo db server:

Parameter  | Default Value
:------------|:---------------
OD_CONFIG_MONGODB_SERVER          | 'mongodb-server' 
OD_CONFIG_MONGODB_PORT            | '3000' 
OD_CONFIG_MONGODB_ADMINUSERNAME   | 'trude' 
OD_CONFIG_MONGODB_ADMINPASSWORD   | 'rosi' 
OD_CONFIG_MONGODB_DB_NAME         | 'opendata' 
OD_CONFIG_MONGODB_COLLECTION_NAME | 'people'


 If the  _OD_CONFIG_MONGODB_URI_ is set, the above values are ignored.
 
 Parameter | Default Value | Syntax
:------------|:--------------- |:--------
OD_CONFIG_MONGODB_URI   | '' | mongodb://[USERNAMAE:PASSWORD@]HOSTNAME:PORT
 
### Configuring API web service:

Parameter | Default Value 
:------------|:---------------
OD_CONFIG_PORT         | 3000 
OD_CONFIG_SITE_BASEURL | '/' 



