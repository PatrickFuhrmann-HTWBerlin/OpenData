#!/bin/bash
#
docker run -d \
       --name web-server \
       --publish 8300:8300 \
       --env OD_API_SERVER_HOST='api-server'  \
       --env OD_API_SERVER_PORT='3000'  \
       --env OD_WEB_SERVER_PORT='8300'  \
       --network open-data-network \
       web-server
