#!/usr/bin/bash

ID=$1
URL='http://localhost:3000/update/'$ID
EMAIL='updated'$ID'@example.com'

http -v PUT $URL \
	email=$EMAIL
