import { injectable } from 'inversify';
import globalConfig, { IConfig } from 'config';
import packageFile from '../../package.json';

/**
 * Small wrapper around node-config,
 * allows to inject the configuration
 */
@injectable()
export class AppConfig implements IConfig {
  private config: IConfig;

  constructor() {
    this.config = globalConfig;
  }

  /**
   * package.json version (app version)
   */
  get version() {
    return packageFile.version;
  }

  /**
   * current NODE_ENV value
   */
  get env() {
    return this.util.getEnv('NODE_ENV');
  }

  /**
   * if is running in development mode
   */
  get isDev() {
    return this.env.startsWith('dev');
  }

  public has(dotNotationParam: string) {
    return this.config.has(dotNotationParam);
  }

  public get<T>(dotNotationParam: string): T {
    return this.config.get(dotNotationParam);
  }

  get util() {
    return this.config.util;
  }
}
