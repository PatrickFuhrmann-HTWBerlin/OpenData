#!/bin/bash
#
if [ "$#" -ne 1 ] ; then
   echo "Usage: ... 'key=value'"
   exit 4
fi
#set -x
#
search=$1
#
curl -w "\ncode=%{http_code}\n" \
     -s \
     "http://localhost:3000/api/people?${search}" |
     awk -F= '/code/{ code=$2 } 
             !/code/{ text=$0  }
             END{  if( code == 200 )print text }' |
     jq .
#
echo ""
exit 0
