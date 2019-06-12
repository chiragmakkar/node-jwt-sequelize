# NodeJS | JWT | Sequelize
Basic authentication using Sequelize and JWT for NodeJS

## Introduction

> Technologies used : Node & mySQL

> Deployment : Heroku || Git

## Installation and Running

> npm install

* Mandatory Setup : Add .env file in root after cloning based on format of test.env

> npm start

* Optional Setup : Mention custom port

> npm start custom_port

## Routes

Protocol | Route Address | Input Parameters | Output JSON Expectation
--- | --- | --- | ---
POST | /user/signup | name, password, email | Authentication Token
POST | /user/signin | email, password | Authentication Token
POST | /user/profile | email | User JSON
GET | /user/profiles/all (secure) | null | Array of all users(in JSON)
POST | /user/profile/update (secure) | email, name | Updated User JSON

## Future Scope

> Unit Tests

> Build Mechanism (Webpack)

> CI/CD