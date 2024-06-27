# Zoro-API

Zoro-API is an Express.js-based backend API project, utilizing TypeScript for type safety and TSOA for API documentation. This README outlines the project's structure, dependencies, and instructions for setting up and running the application.

## Table of Contents
- [Installation](#installation)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [DevDependencies](#devdependencies)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Fake Service Layer](#fake-service-layer)

## Installation

To get started with Zoro-API, clone the repository and install the necessary dependencies.

```bash
git clone <repository-url>
cd zoro-api
npm install
```

## Scripts

Here is a list of scripts you can run with `npm`:

- **dev**: Runs the application in development mode with `nodemon` and `ts-node`.
  ```bash
  npm run dev
  ```
- **build**: Compiles TypeScript files to JavaScript.
  ```bash
  npm run build
  ```
- **start**: Starts the application in production mode.
  ```bash
  npm run start
  ```
- **routes**: Generates routes using TSOA.
  ```bash
  npm run routes
  ```
- **swagger**: Generates Swagger specifications using TSOA.
  ```bash
  npm run swagger
  ```
- **test**: Runs tests using Jest.
  ```bash
  npm run test
  ```

## Dependencies

These are the core dependencies required for the project:

- `bcrypt`: ^5.1.1
- `body-parser`: ^1.20.2
- `cors`: ^2.8.5
- `dotenv`: ^16.4.5
- `express`: ^4.19.2
- `express-validator`: ^7.1.0
- `mongoose`: ^8.4.4
- `swagger-jsdoc`: ^6.2.8
- `swagger-ui-express`: ^5.0.1
- `tsoa`: ^6.3.1

## DevDependencies

These are the development dependencies used for testing, linting, and building the project:

- `@types/bcrypt`: ^5.0.2
- `@types/cors`: ^2.8.17
- `@types/dotenv`: ^8.2.0
- `@types/express`: ^4.17.21
- `@types/express-validator`: ^3.0.0
- `@types/jest`: ^29.5.12
- `@types/node`: ^20.14.9
- `@types/supertest`: ^6.0.2
- `@types/swagger-jsdoc`: ^6.0.4
- `@types/swagger-ui-express`: ^4.1.6
- `concurrently`: ^8.2.2
- `jest`: ^29.7.0
- `nodemon`: ^3.1.4
- `supertest`: ^7.0.0
- `swagger-autogen`: ^2.23.7
- `ts-jest`: ^29.1.5
- `ts-node`: ^10.9.2
- `ts-node-dev`: ^2.0.0
- `typescript`: ^5.5.2

## Running the Application

To run the application in development mode:

```bash
npm run dev
```

To build the application:

```bash
npm run build
```

To start the application in production mode:

```bash
npm run start
```

## Testing

Zoro-API uses Jest for testing.

- To run unit tests with Jest:
  ```bash
  npm run test
  ```

## API Documentation

The project uses TSOA to generate routes and Swagger documentation.

- To generate the routes:
  ```bash
  npm run routes
  ```

- To generate the Swagger specification:
  ```bash
  npm run swagger
  ```

The generated Swagger documentation can be accessed at `http://localhost:3000/docs`.

## Fake Service Layer

Zoro-API includes a fake service layer to simulate API responses and facilitate development and testing. This layer provides mock implementations of the services, allowing you to develop and test the API without requiring access to actual backend services.

To use the fake service layer, ensure the fake services are imported and utilized in the relevant parts of the application. This setup can be particularly useful for frontend developers who need consistent and predictable API responses during development.
