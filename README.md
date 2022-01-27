## Description

This is the metrix-api an API in charge of collecting data from external resources and providing the endpoints needed to setup and see reports from available data.

### Supported external resources
- Jira API
- Harvest API

## Tech Stack
The application uses the following technologies:
- Nest.js

## Installation

1. Make sure to copy `.env.example` into a brand new `.env` file.  
Adjust values as needed.

2. Install the dependencies
```bash
$ npm install
```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
