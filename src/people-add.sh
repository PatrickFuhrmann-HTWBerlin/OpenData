#!/bin/bash
#
if [ "$#" -ne 3 ] ; then
   echo "Usage: ... <name> <givenName> <birthday>"
   exit 4
fi
#set -x
#
name=$1
givenName=$2
birthday=$3
#
curl -X POST "http://localhost:3000/api/people" \
    -H "Content-Type: application/json"  \
    -d "{\"name\":      \"${name}\",         \
         \"givenName\": \"${givenName}\",    \
         \"birthday\":  \"${birthday}\" }"
echo ""
exit 0
