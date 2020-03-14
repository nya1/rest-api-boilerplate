import { app } from '@src/app';
import { AppConfig } from '@src/util/config';
import { AppIoC } from '@src/util/container';
import { AppLogger } from '@src/util/logger';

// get logger and config
const config = AppIoC.get(AppConfig);
const logger = AppIoC.get(AppLogger);

// listen
const PORT = config.get('app.port');
app.listen(PORT, () => {
  logger.info(`started server: http://localhost:${PORT}/`);
});
