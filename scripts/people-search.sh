#!/bin/bash
#
if [ "$#" -ne 1 ] ; then
   echo "Usage: ... 'key=value'"
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
search=$1
#
curl -w "\ncode=%{http_code}\n" \
     -s \
     "http://${OD_API_HOST}:${OD_API_PORT}${OD_API_PREFIX}/api/people?${search}" |
     awk -F= '/code/{ code=$2 } 
             !/code/{ text=$0  }
             END{  if( code == 200 )print text }' |
     jq .
#
echo ""
exit 0
