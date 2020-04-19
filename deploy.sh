#!/bin/bash

set -e

# validate $NODE_CONFIG
echo "Validating NODE_CONFIG..."
yarn validate:config

echo "NODE_CONFIG is valid"

# at this point $NODE_CONFIG is set and valid

# lint
yarn lint

# build
yarn build

# run serverless deploy, this step can be changed with your devops setup
yarn serverless deploy -c deploy/serverless.yaml --force

# here you can ping the url
