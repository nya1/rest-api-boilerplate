/**
 * this file should be used to start the server when compiled
 */

// allow to use alias paths (for javascript), see `_moduleAliases` in package.json
require('module-alias/register');

// load server
import '@src/server';
