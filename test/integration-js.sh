#!/bin/bash

# build
yarn build

if [[ -z "${NODE_ENV}" ]]; then
  export NODE_ENV="development"
fi

echo "running on NODE_ENV set to $NODE_ENV"

config_file="config/$NODE_ENV.toml"

echo "loading config: $config_file"

# get config port by parsing configuration file
server_port=$(grep -Po '(?<=^port=|port = )\w*$' $config_file)

echo "server port to run js server: $server_port"

re='^[0-9]+$'
if ! [[ $server_port =~ $re ]] ; then
   echo "error: port should be a number" >&2; exit 1
fi

test_server_url="tcp:$server_port"

# call `start-server-and-test` with params
export LOCAL_TESTING=1
yarn start-server-and-test serve:js $test_server_url test:integration
