# Getting Started with Create Single-SPA

This project was bootstrapped with [Create Single-SPA](https://single-spa.js.org/docs/create-single-spa/).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:9000](http://localhost:9000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner.

### `yarn build`

Builds the app for production to the `build` folder.

# Architectural Overview

single-spa takes inspiration from modern framework component lifecycles by abstracting lifecycles for entire applications. Born out of Canopy's desire to use React + react-router instead of being forever stuck with our AngularJS + ui-router application, single-spa is now a mature library that enables frontend microservices architecture aka "microfrontends". Microfrontends enable many benefits such as independent deployments, migration and experimentation, and resilient applications.

## This is the root config

A single-spa root config, which renders the HTML page and the JavaScript that registers applications. Each application is registered with three things:

- A name
- A function to load the application's code
- A function that determines when the application is active/inactive

## Switching environments && Deployment

### While you can deploy to dev manually this is unnecessary as circleCI will perform a deploy to the dev environment on merging to the master branch in the github repo

this project uses firebase hosting for deployment, to change deployment environments use this command:

dev:

- firebase use default

prod:

- firebase use production

once you are in the desired environment deploy the project using this command:

firebase deploy --only hosting
