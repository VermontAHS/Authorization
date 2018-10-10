#!/usr/bin/bash

ID=$1
URL='http://localhost:3000/delete/'$ID

http -v DELETE $URL
