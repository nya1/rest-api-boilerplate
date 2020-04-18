
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
  * Validate configuration before deployment against a json schema
  * *Optional* deployment setup via Serverless (AWS) as a Lambda


The goal of this project is to provide a simple, easy to use base to build new rest apis.

## Documentation

 * [Controllers, Middlewares, Services](src/README.md#request-response)
 * [Configuration](config/README.md)
 * [Development](src/README.md#development)
 * [Testing](test/README.md)
 * [Deployment](deploy/README.md)

## Getting started

Clone this repository

`git clone git@github.com:nya1/rest-api-boilerplate.git my-api-project`

Install

`cd my-api-project && yarn install`

---

Using the following modules

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

