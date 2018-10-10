#!/usr/bin/bash

ID=$1
URL='http://localhost:3000/user/'$ID

http $URL
