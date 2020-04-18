# Deploy

Code is independent from serverless/cloud providers and can be run via docker or standalone.

Before deployment the deploy script will validate the `$NODE_CONFIG` content against a json schema defined in [deploy/configSchema.json](configSchema.json)

By default serverless (aws provider) is used, the api will be deployed as one lambda function.

`yarn deploy`

Stage can be appended i.e. `yarn deploy --stage production`

**note** remember to set the env variable `$NODE_CONFIG` with your json config, e.g. `{"app":{"port":3000}}` this will be loaded instead of the config directory (where you don't want to store sensitive data)
