import { injectable, inject } from 'inversify';
import { Logger as WinstonLogger, format, createLogger, transports } from 'winston';
import { AppConfig } from './config';

/**
 * factory class for winston logger
 * it can be extended with multiple transports
 */
class WinstonLoggerFactory {
  private appName: string;
  private version: string;
  private currentEnv: string;

  constructor(@inject(AppConfig) private config: AppConfig) {
    const appName = this.config.get('app.name');
    if (typeof appName !== 'string') {
      throw new Error('Expected app.name');
    }
    this.appName = appName;

    this.version = this.config.version;

    this.currentEnv = this.config.env;
  }

  public createLogger(innerLabel: string | undefined) {
    const loggerInstance = createLogger({
      // default metadata, can be easily indexed
      defaultMeta: {
        service: this.appName,
        'tag:env': this.currentEnv,
        'tag:version': this.version,
      },
      format: format.json(),
      transports: [],
    });

    // add transport based on env
    if (this.config.isDev) {
      // will log to console
      loggerInstance.add(
        new transports.Console({
          level: 'debug',
          format: format.combine(
            format.label({ label: innerLabel }),
            format.timestamp(),
            format.colorize(),
            format.prettyPrint(),
            this.localFormat(),
          ),
        }),
      );
    } else {
      // here you can add transports for staging/production use
    }

    return loggerInstance;
  }

  /**
   * winston formatter for local use (will print to console)
   */
  private localFormat() {
    return format.printf((info) => {
      return `${info.timestamp} [${info.service}]${info.label ? '[' + info.label + ']' : ''} ${
        info.level
      }: ${info.message} ${
        info.meta && info.meta.length ? JSON.stringify(info.meta, null, 2) : ''
      }`;
    });
  }
}

/**
 * logger class used accross the app
 */
@injectable()
export class AppLogger {
  private logger: WinstonLogger;
  private loggerFactory: WinstonLoggerFactory;

  constructor(@inject(AppConfig) private config: AppConfig, callerName: string | undefined) {
    // create logger instance
    this.loggerFactory = new WinstonLoggerFactory(config);
    this.logger = this.loggerFactory.createLogger(callerName);
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
