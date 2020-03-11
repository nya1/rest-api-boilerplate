
# TypeScript REST API Sample

Basic rest api setup to quickly bootstrap a project based on TypeScript and stable modules.

**Features**

  * Use decorators to describe endpoints and middlewares
  * Automatically create a OpenAPI v3 (swagger) file with minimal effort (based on decorators used)
  * Jest for tests with code coverage (text summary and HTML)
  * Dependency Injection via Inversify
  * Linter setup (ESLint + Prettier)
  * Configuration via TOML files (using [node-config](https://github.com/lorenwest/node-config))
  * Automatically reloads the server if a file changes while developing
  * Flexibile logging with winston

## Configuration

By default [TOML](https://github.com/toml-lang/toml#example) is used and the configuration is located here: [`config/NODE_ENV.toml`](config/development.toml)


### Install

Clone this repository

`yarn install`

### Start local (dev) server

`yarn dev`

Will start the api on localhost (port changes based on config), it will automatically restart the server if a file changes.

### Test

`yarn test`

### Linting

`yarn lint`

Will run eslint with prettier

---

Using the following (main) modules

 * [routing-controllers](https://github.com/typestack/routing-controllers)

   * Request / Response handling

 * [class-validator](https://github.com/typestack/class-validator)

   * Validate request data

 * [class-transformer](https://github.com/typestack/class-transformer)

   * For serialization / deserialization

 * [routing-controllers-openapi](https://github.com/epiphone/routing-controllers-openapi)
  
   * Allow to describe an OpenAPI spec file by using decorators

 * [nodemon](https://github.com/remy/nodemon)
  
   * Watch files and restart the server in dev mode

 * [winston](https://github.com/winstonjs/winston)
  
   * Logging

