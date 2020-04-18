# Request Response

Using routing-controllers module (with express), see readme: https://github.com/typestack/routing-controllers#readme

 * Entities files (folder `entities`) are used to rapresent what data we expect from POST/PUT body requests
 * Models files (folder `models`) are used to describe the internal data structure that is present on database

# Development 

`yarn dev`

Will start the api on localhost (port changes based on config), it will automatically restart the server if a file changes.

### Linting

`yarn lint`

Will run eslint with prettier

### Generate open api spec file

Will load the decorators used according to [routing-controllers-openapi](https://github.com/epiphone/routing-controllers-openapi#readme) and [class-validator-jsonschema](https://github.com/epiphone/class-validator-jsonschema#readme)

`yarn openapi:generate`

Will generate open api spec file in the root directory `openapi.spec.json`
