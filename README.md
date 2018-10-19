Authorization
=============

A prototype authentication and authorization service

## About

This is a prototype service for building a desired "to be" single interface for other applications and services to authorize and authenticate users.  The future state of this service will allow a variety of different authentication and identity services behind the scenes while all new application development will authenticate with this REST URL pattern.  This will help obfuscate the risk associated with leveraging multiple, platform specific authentication and identity providers.

## Prereqs

This project relies on [Node.js](https://nodejs.org/en/) and is currently using v8.12.0 LTS.  Follow the instructions on how to install Node.js for your operating system.

## Install

```bash
$> git clone https://github.com/VermontAHS/Authorization && cd Authorization/
$> npm install
```

## Commands

### Migrate Database

_To keep the prototype light and portable, [Sqlite](https://www.sqlite.org/index.html) is used as the database_

```bash
## Create database migrations
$> npm run up

## Rollback database migrations
$> npm run down
```

### Run Tests

```bash
$> npm run test
```

### Start Server

```bash
$> npm run start
```

## How To

```bash
## Run database migrations... These must be run one time before server can work properly
$> npm run up

## Start server
$> npm run start

## Once started, requests can be made to http://localhost:3000
```

## API

### Routes

#### Create User

-	__Description__: Creates a new user

-	__URL__: `/create`

-	__Method__: `POST`

-	__Request Body__:
	-	`username`: _Required_
	-	`first_name`: _Required_
	-	`last_name`: _Required_
	-	`mi`: _Optional_
	-	`suffix`: _Optional_
	-	`email`: _Required_
	-	`password`: _Required_

- __Response__:
	-	`id`: An id generated once user is created

#### Delete User

-	__Description__: Deletes a user by id

-	__URL__: `/delete/:id`

-	__Method__: `DELETE`

-	__URL Params__:
	-	`id`: _Required_

- __Response__:
	-	`id`: The deleted user id

#### Update User

-	__Description__: Updates a user by id

-	__URL__: `/update/:id`

-	__Method__: `UPDATE`

-	__URL Params__:
	-	`id`: _Required_

-	__Request Body__
	-	`username`: _Optional_
	-	`first_name`: _Optional_
	-	`last_name`: _Optional_
	-	`mi`: _Optional_
	-	`suffix`: _Optional_
	-	`email`: _Optional_
	-	`password`: _Optional_

- __Response__:
	- `id`: The updated user id

#### Read User

-	__Description__: Reads a user by id

-	__URL__: `/user/:id`

-	__Method__: `GET`

-	__URL Params__:
	-	`id`: _Required_

- __Response__:
	-	`id`
	-	`username`
	-	`first_name`
	-	`last_name`
	-	`mi`
	-	`suffix`
	-	`email`
	-	`password`

#### List Users

-	__Description__: Lists all users

-	__URL__: `/users`

-	__Method__: `GET`

- __Response__:
	- `list`:
		-	`id`
		-	`username`
		-	`first_name`
		-	`last_name`
		-	`mi`
		-	`suffix`
		-	`email`
		-	`password`


#### Sign In

-	__Description__: Sign in a user

-	__URL__: `/signin`

-	__Method__: `POST`

-	__Request Body__
	-	`username`: _Required_
	-	`email`: _Required_
	-	`password`: _Required_

- __Response__:
	-	`id`
	-	`username`
	-	`first_name`
	-	`last_name`
	-	`mi`
	-	`suffix`
	-	`email`
	-	`password`
