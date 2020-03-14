import { JsonController, Get } from 'routing-controllers';
import { injectable, inject, named } from 'inversify';
import { AppLogger } from '@src/util/logger';
import packageFile from '../../package.json';

/**
 * Simple controller to ping
 */
@JsonController('') // root
@injectable()
export class RootController {
  // package version in use
  private packageVersion: string;

  constructor(@inject(AppLogger) @named('RootController') private logger: AppLogger) {
    // take package version
    this.packageVersion = packageFile.version;
  }

  @Get('/ping')
  ping() {
    this.logger.debug('called ping');
    return { success: true };
  }

  @Get('/tag')
  tag() {
    this.logger.debug('called tag');
    return { version: this.packageVersion };
  }
}
