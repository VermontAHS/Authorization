#!/usr/bin/bash

URL='http://localhost:3000/signin'
USERNAME=$1
PASSWORD=$2

http -v POST $URL \
	username=$USERNAME \
	password=$PASSWORD
