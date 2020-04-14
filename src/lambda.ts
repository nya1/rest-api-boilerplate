/**
 * this file contains the handler for aws lambda
 */
import 'reflect-metadata';

// allow to use alias paths (for javascript), see `_moduleAliases` in package.json
require('module-alias/register');

// get app
import { app } from '@src/app';

// no typings at the moment
// eslint-disable-next-line @typescript-eslint/no-var-requires
const awsServerlessExpress = require('aws-serverless-express');
const server = awsServerlessExpress.createServer(app);

// this is the entrypoint for labmbda
exports.handler = (event: any, context: any) => {
  awsServerlessExpress.proxy(server, event, context);
};
