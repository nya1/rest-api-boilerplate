import { JsonController, Get } from 'routing-controllers';
import { injectable, inject, named } from 'inversify';
import packageFile from '../../package.json';
import { AppLogger } from '@src/util/logger';

@JsonController('') // root
@injectable()
export class RootController {
  // package version in use
  private packageVersion: string;

  constructor(@inject(AppLogger) @named('Root') private logger: AppLogger) {
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
