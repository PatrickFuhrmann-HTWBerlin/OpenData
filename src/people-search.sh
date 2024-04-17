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
curl -s "http://localhost:3000/api/people?${search}" | jq .
#
echo ""
exit 0
