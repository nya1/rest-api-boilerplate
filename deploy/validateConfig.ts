// eslint-disable-next-line import/no-extraneous-dependencies
import Ajv from 'ajv';
import jsonSchema from './configSchema.json';

/**
 * this is just a simple helper to validate the JSON config
 * against the json-schema present in `configSchema.json`
 */

// take argument or NODE_CONFIG
const jsonContent = process.argv[2] || process.env.NODE_CONFIG;

if (!jsonContent) {
  throw new Error('config data not found, are you sure that NODE_CONFIG is set?');
}

let jsonContentConfig: any | null;

try {
  jsonContentConfig = JSON.parse(jsonContent);
} catch (err) {
  throw new Error('expected a valid json as NODE_CONFIG ');
}

// validate
const ajv = new Ajv({ logger: false });
const isValid = ajv.validate(jsonSchema, jsonContentConfig);
if (!isValid) {
  throw new Error(`NODE_CONFIG validation failed: ${ajv.errorsText(ajv.errors)}`);
}
