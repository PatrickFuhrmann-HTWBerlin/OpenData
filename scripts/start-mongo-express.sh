#!/bin/bash
#
docker run -d \
       --name mongo-view \
       --publish 7001:8081 \
       --env ME_CONFIG_BASICAUTH_USERNAME=view \
       --env ME_CONFIG_BASICAUTH_PASSWORD=view \
       --env ME_CONFIG_MONGODB_SERVER=mongodb-server \
       --env ME_CONFIG_MONGODB_PORT=27017 \
       --env ME_CONFIG_MONGODB_ADMINUSERNAME=trude \
       --env ME_CONFIG_MONGODB_ADMINPASSWORD=rosi \
       --env ME_CONFIG_SITE_BASEURL='/'  \
       --network open-data-network \
       mongo-express
