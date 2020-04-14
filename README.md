
# TypeScript REST API Sample

<p align="center">
  <a href="https://github.com/nya1/rest-api-boilerplate/actions" target="_blank"><img src="https://github.com/nya1/rest-api-boilerplate/workflows/test%20&%20build/badge.svg"></a>
  &nbsp;
  <a href="https://david-dm.org/nya1/rest-api-boilerplate" target="_blank" ><img src="https://david-dm.org/nya1/rest-api-boilerplate/status.svg"></a>
  &nbsp;
  <a href="https://david-dm.org/nya1/rest-api-boilerplate?type=dev" target="_blank" ><img src="https://david-dm.org/nya1/rest-api-boilerplate/dev-status.svg"></a>
</p>

Basic rest api setup to quickly bootstrap a project based on TypeScript and popular & maintened modules.

**Features**

  * Use decorators to describe endpoints and middlewares (thanks to [routing-controllers](https://github.com/typestack/routing-controllers))
  * Automatically create a OpenAPI v3 (swagger) file with minimal effort (based on decorators used - thanks to [routing-controllers-openapi](https://github.com/epiphone/routing-controllers-openapi))
  * Jest for tests with code coverage (text summary and HTML)
  * Unit and integration tests setup, integration tests can be run also against compiled JS server
  * Dependency Injection via Inversify
  * Linter setup (ESLint + Prettier)
  * Configuration via TOML files (using [node-config](https://github.com/lorenwest/node-config))
  * Automatically reloads the server if a file changes while developing
  * Flexibile logging with winston
  * *Optional* deployment setup via Serverless (AWS) as a Lambda


The goal of this project is to provide a simple, easy to use base to build new rest apis.

## Documentation

 * Create controllers, middlewares, request/response: https://github.com/typestack/routing-controllers#readme

 * Configuration https://github.com/lorenwest/node-config/wiki


## Configuration

By default [TOML](https://github.com/toml-lang/toml#example) is used and the configuration is located here: [`config/NODE_ENV.toml`](config/development.toml)


### Install

Clone this repository

`git clone git@github.com:nya1/rest-api-boilerplate.git my-api-project`

Install

`cd my-api-project && yarn install`

### Start local (dev) server

`yarn dev`

Will start the api on localhost (port changes based on config), it will automatically restart the server if a file changes.

### Test

`yarn test`

Will run unit and integration tests (typescript)

`yarn test:ci`

Will run unit and integration tests against typescript and compiled javascript server

`yarn test:coverage`

Will run unit and integration tests (typescript) and open the default browser with the HTML coverage reporter

`yarn test:unit`

Run only unit tests (typescript)

`yarn test:integration`

Run only integration tests (typescript)

`yarn test:integration:js`

Run integration tests against compiled javascript server

### Linting

`yarn lint`

Will run eslint with prettier

### Generate open api spec file

`yarn openapi:generate`

Will generate open api spec file in the root directory `openapi.spec.json`

### Deploy

By default serverless (aws provider) is used, the api will be deployed as one lambda function.

`yarn deploy`

Stage can be appended i.e. `yarn deploy --stage production`

**note** remember to set `NODE_CONFIG` with your json config, e.g. `{"app":{"port":3000}}` this will be loaded instead of config directory (where you don't want to store sensitive data)

---

Using the following prod modules

 * [routing-controllers](https://github.com/typestack/routing-controllers)

   * Request / Response handling

 * [class-validator](https://github.com/typestack/class-validator)

   * Validate request data

 * [class-transformer](https://github.com/typestack/class-transformer)

   * For serialization / deserialization

 * [routing-controllers-openapi](https://github.com/epiphone/routing-controllers-openapi)
  
   * Allow to describe an OpenAPI spec file by using decorators

 * [winston](https://github.com/winstonjs/winston)
  
   * Logging

