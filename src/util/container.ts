import { Container, interfaces } from 'inversify';
import { AppConfig } from './config';
import { RootController } from '@src/controllers/root';
import { AppLogger } from './logger';

export class AppContainer {
  public container: Container;

  constructor() {
    this.container = new Container({ defaultScope: 'Singleton' });
  }

  /**
   * allow to bind all required modules (that are injected)
   * - utils
   * - middlewares
   * - controllers
   * - services
   */
  public bindAll() {
    this.bindUtils();
    this.bindControllers();
  }

  /**
   * bind utils
   */
  private bindUtils() {
    // config
    this.container.bind(AppConfig).toSelf();

    // logger bind and allow named binding to add more context to logger
    this.container.bind(AppLogger).toDynamicValue((context: interfaces.Context) => {
      const namedMetadata = context.currentRequest.target.getNamedTag();
      const named = namedMetadata && namedMetadata.value ? namedMetadata.value : undefined;
      const config = this.container.get<AppConfig>(AppConfig);
      return new AppLogger(config, named);
    });
  }

  /**
   * bind controllers
   */
  private bindControllers() {
    this.container.bind(RootController).toSelf();
  }
}
