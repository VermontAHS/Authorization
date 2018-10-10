#!/usr/bin/bash

URL='http://localhost:3000/create'
USERNAME='demouser_'$1
PASSWORD='greatpassword'
FIRST='Water'
LAST='Vermonteer'
EMAIL='demo@example.com'

http -v POST $URL \
	username=$USERNAME \
	first_name=$FIRST \
	last_name=$LAST \
	email=$EMAIL \
	password=$PASSWORD
