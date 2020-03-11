/**
 * this file should be used to start the server when compiled
 */

// allow to use alias in paths
require('module-alias/register');

import { app, container } from '@src/app';
import { AppConfig } from '@src/util/config';
import { AppLogger } from './util/logger';

// get logger and config
const config = container.get<AppConfig>(AppConfig);
const logger = container.get<AppLogger>(AppLogger);

// listen
const PORT = config.get('app.port');
app.listen(PORT, () => {
  logger.info(`started server: http://localhost:${PORT}/`);
});
