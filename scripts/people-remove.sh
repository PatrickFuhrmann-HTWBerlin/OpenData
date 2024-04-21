#!/bin/bash
#
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
#set -x
#
search="name=${name}&givenName=${givenName}&birthday=${birthday}"
#
curl -s -X DELETE  "http://localhost:3000/api/people?${search}" 
#
echo ""
exit 0
