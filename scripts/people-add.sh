#!/bin/bash
#
if [ "$#" -ne 3 ] ; then
   echo "Usage: ... <name> <givenName> <birthday>"
   exit 4
fi

if [ -z "${OD_API_HOST}" -o -z "${OD_API_PORT}" ] ; then
   echo "Please the following environment variables:"
   echo "OD_API_HOST and OD_API_PORT"
   echo "Optional OD_API_PREFIX"
   exit 4
fi
#set -x
#
name=$1
givenName=$2
birthday=$3
#
curl -X POST "http://${OD_API_HOST}:${OD_API_PORT}${OD_API_PREFIX}/api/people" \
    -H "Content-Type: application/json"  \
    -d "{\"name\":      \"${name}\",         \
         \"givenName\": \"${givenName}\",    \
         \"birthday\":  \"${birthday}\" }"
echo ""
exit 0
