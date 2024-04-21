#!/bin/bash

rand=`date +"%H%M%S"`
first="Given-${rand}"
last="Last-${rand}"
dt="2000-01-01"

echo "--- Adding Random user ${last} ${first} ${dt}"
echo ""
./people-add.sh ${last} ${first} ${dt}
echo ""
echo "--- Adding same user again!"
echo ""
./people-add.sh ${last} ${first} ${dt}
echo ""

echo "--- Searching for the user!"
echo ""
./people-search.sh name=${last}
echo ""
echo "--- Removing the user again!"
echo ""
./people-remove.sh ${last} ${first} ${dt}
echo ""
echo "--- Removing the same user!"
echo ""
./people-remove.sh ${last} ${first} ${dt}
echo ""
exit 0
