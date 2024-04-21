#!/bin/bash
#
API_PORT=7003
WEB_PORT=7002
docker run -d \
       --name web-server \
       --publish ${WEB_PORT}:${WEB_PORT} \
       --env OD_API_SERVER_HOST='api-server'  \
       --env OD_API_SERVER_PORT=${API_PORT}  \
       --env OD_WEB_SERVER_PORT=${WEB_PORT}  \
       --network open-data-network \
       web-server
