import { injectable, inject } from 'inversify';
import { Logger as WinstonLogger, format, createLogger, transports } from 'winston';
import expressHttpLogger from 'express-winston';
import { Response } from 'express';
import { AppConfig } from './config';

/**
 * factory class for winston logger
 * it can be extended with multiple transports
 */
export class WinstonLoggerFactory {
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

  get defaultMetadata() {
    return {
      service: this.appName,
      'tag:env': this.currentEnv,
      'tag:version': this.version,
    };
  }

  public createLogger(innerLabel: string | undefined) {
    const loggerInstance = createLogger({
      // default metadata, can be easily indexed
      defaultMeta: this.defaultMetadata,
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
   * customize logger to be used in express logging
   */
  public getRequestLogger() {
    const winstonInstance = this.createLogger('http'); // http label

    // set express-winston custom options
    const expressWinstonOpts: expressHttpLogger.LoggerOptionsWithWinstonInstance = {
      winstonInstance,
      baseMeta: this.defaultMetadata, // re-use default metadata as base
      headerBlacklist: ['x-api-key', 'authorization'], // hide auth headers
      bodyBlacklist: ['email', 'password'], // hide private data
      metaField: 'http', // where req and res objects are saved
      responseWhitelist: ['statusCode', 'body'], // from response take status, body, header
      // dynamic level based on statusCode
      level: (_req, res) => {
        return res.statusCode !== 500 ? 'info' : 'error'; // count as error only 500s
      },
      dynamicMeta: (_req, res: Response) => {
        let requestId: string | undefined;
        if (res.hasHeader('x-request-id')) {
          requestId = res.getHeader('x-request-id') as string;
        }
        console.log(requestId);
        return { requestId };
      },
      // you can also ignore entire routes with `ignoredRoutes: ['/todo']`
    };

    // merge to logger
    return expressWinstonOpts;
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
      } ${info.http ? '\n' + JSON.stringify(info.http, null, 2) : ''}`;
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
