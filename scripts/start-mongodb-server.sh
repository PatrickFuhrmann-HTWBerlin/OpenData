#!/bin/bash
#
export DB_DIRECTORY=${HOME}/mongodb
mkdir -p ${DB_DIRECTORY}
if [ $? -ne 0 ] ; then
     echo "Coudn't create mongoDB data directory : ${DB_DIRECTORY}" >&2
     exit 4
fi
#
docker run -d \
       --name mongodb-server \
       --env MONGO_INITDB_ROOT_USERNAME=trude \
       --env MONGO_INITDB_ROOT_PASSWORD=rosi \
       --volume  ${DB_DIRECTORY}:/data/db \
       --network open-data-network \
       --publish 27019:27017 \
       mongo
#
#   NOT NEEDED
#      --publish 27019:27017 
#
