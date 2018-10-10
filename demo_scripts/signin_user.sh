#!/usr/bin/bash

URL='http://localhost:3000/signin'
USERNAME='testuser'
PASSWORD='password'

http -v POST $URL \
	username=$USERNAME \
	password=$PASSWORD
