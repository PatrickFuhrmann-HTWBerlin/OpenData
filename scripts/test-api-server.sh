#!/bin/bash

rand=`date +"%H%M%S"`
first="Given-${rand}"
last="Last-${rand}"
dt="2000-01-01"

./people-add.sh ${last} ${first} ${dt}
./people-add.sh ${last} ${first} ${dt}

./people-search.sh name=${last}

./people-remove.sh ${last} ${first} ${dt}
./people-remove.sh ${last} ${first} ${dt}

exit 0
