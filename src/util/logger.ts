import { injectable, inject } from 'inversify';
import { Logger as WinstonLogger, format, createLogger, transports } from 'winston';
import { AppConfig } from './config';

/**
 * factory class for winston logger
 * it can be extended with multiple transports
 */
class WinstonLoggerFactory {
  public createLogger(appName: string, innerLabel: string | undefined) {
    const localFormat = format.printf(info => {
      return `${info.timestamp} [${info.service}]${info.label ? '[' + info.label + ']' : ''} ${info.level}: ${
        info.message
      } ${info.meta && info.meta.length ? JSON.stringify(info.meta, null, 2) : ''}`;
    });

    return createLogger({
      defaultMeta: { service: appName },
      format: format.json(),
      transports: [
        new transports.Console({
          level: 'debug',
          format: format.combine(
            format.label({ label: innerLabel }),
            format.timestamp(),
            format.colorize(),
            format.prettyPrint(),
            localFormat,
          ),
        }),
      ],
    });
  }
}

/**
 * logger class used accross the app
 */
@injectable()
export class AppLogger {
  private logger: WinstonLogger;
  private loggerFactory = new WinstonLoggerFactory();

  constructor(@inject(AppConfig) private config: AppConfig, callerName: string | undefined) {
    const appName = this.config.get('app.name');
    if (typeof appName !== 'string') {
      throw new Error('Expected app.name');
    }

    this.logger = this.loggerFactory.createLogger(appName, callerName);
  }

  public debug(msg: string, ...meta: any[]) {
    return this.logger.debug(msg, { meta });
  }

  public info(msg: string, ...meta: any[]) {
    return this.logger.info(msg, { meta });
  }

  public error(msg: string, ...meta: any[]) {
    return this.logger.error(msg, { meta });
  }

  public warn(msg: string, ...meta: any[]) {
    return this.logger.warn(msg, { meta });
  }

  public log(level: string, msg: string, ...meta: any[]) {
    return this.logger.log(level, msg, { meta });
  }
}
