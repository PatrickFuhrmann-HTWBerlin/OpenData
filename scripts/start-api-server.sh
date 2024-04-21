#!/bin/bash
#
API_PORT=7003
#
docker run -d \
       --name api-server \
       --publish ${API_PORT}:7003 \
       --env OD_CONFIG_MONGODB_SERVER=mongodb-server \
       --env OD_CONFIG_MONGODB_PORT=27017 \
       --env OD_CONFIG_MONGODB_ADMINUSERNAME=trude \
       --env OD_CONFIG_MONGODB_ADMINPASSWORD=rosi \
       --env OD_CONFIG_MONGODB_DB_NAME=opendata \
       --env OD_CONFIG_MONGODB_COLLECTION_NAME=people \
       --env OD_CONFIG_SITE_BASEURL='/'  \
       --env OD_CONFIG_PORT=${API_PORT}  \
       --network open-data-network \
       api-server
