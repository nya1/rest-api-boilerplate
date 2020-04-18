Using node-config module https://github.com/lorenwest/node-config#readme

By default [TOML](https://github.com/toml-lang/toml#example) is used and the configuration is located here: [`config/NODE_ENV.toml`](development.toml) (default `development`)

At deployment time `NODE_CONFIG` environment variable can be set with the json configuration, in this way you don't need to write any secrets in the filesystem
