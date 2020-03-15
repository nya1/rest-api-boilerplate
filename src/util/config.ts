import { injectable } from 'inversify';
import globalConfig, { IConfig } from 'config';
import packageFile from '../../package.json';

/**
 * Small wrapper around node-config,
 * allows to inject the configuration
 */
@injectable()
export class AppConfig {
  private config: IConfig;

  constructor() {
    this.config = globalConfig;
  }

  get version() {
    return packageFile.version;
  }

  get env() {
    return this.util.getEnv('NODE_ENV');
  }

  public has(dotNotationParam: string) {
    return this.config.has(dotNotationParam);
  }

  public get(dotNotationParam: string) {
    return this.config.get(dotNotationParam);
  }

  get util() {
    return this.config.util;
  }
}
