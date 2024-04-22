# Open Data Project

## API Server
### Environment

#### Configuring access to mongo db server:

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

## Web Server
### Environment

#### Configuring API web service:
Parameter | Default Value 
:------------|:---------------
OD_API_SERVER_HOST | api-server
OD_API_SERVER_PORT | 3000
OD_CONFIG_PORT         | 8300 
OD_CONFIG_SITE_BASEURL | '/' 

## Examples

```
cd scicat
git clone https://github.com/PatrickFuhrmann-HTWBerlin/OpenData.git
cd OpenData/services/API
docker build -t api-server .
cd ../WEB/
docker build -t web-server .
cd ../..
cd scripts/
./start-mongodb-server.sh 
docker network ls
docker ps
./start-mongo-express.sh 
docker ps
./start-api-server.sh 
./start-web-server.sh 
export OD_API_HOST=localhost
export OD_API_PORT=7003
./test-api-server.sh 
```



