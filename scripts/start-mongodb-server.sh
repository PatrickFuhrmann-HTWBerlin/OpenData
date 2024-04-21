#!/bin/bash
#
docker run -d \
       --name mongodb-server \
       --env MONGO_INITDB_ROOT_USERNAME=trude \
       --env MONGO_INITDB_ROOT_PASSWORD=rosi \
       --volume  /Users/patrick/waste/db1:/data/db \
       --network open-data-network \
       --publish 27019:27017 \
       mongo
#
#   NOT NEEDED
#      --publish 27019:27017 
#
