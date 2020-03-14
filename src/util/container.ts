import { Container, interfaces } from 'inversify';
import { RootController } from '@src/controllers/root';
import { TodoController } from '@src/controllers/todo';
import { TodoService } from '@src/services/todo';
import { AppConfig } from './config';
import { AppLogger } from './logger';

export const AppIoC = new Container({ defaultScope: 'Singleton' });

export class AppContainer {
  public container: Container;

  constructor() {
    this.container = AppIoC;
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
    this.bindServices();
    this.bindControllers();
  }

  /**
   * bind utils
   */
  private bindUtils() {
    // config
    this.container.bind(AppConfig).toSelf();

    // logger bind and allow named binding to add more context to logger
    this.container
      .bind(AppLogger)
      .toDynamicValue((context: interfaces.Context) => {
        const namedMetadata = context.currentRequest.target.getNamedTag();
        const named = namedMetadata && namedMetadata.value ? namedMetadata.value : undefined;
        const config = this.container.get<AppConfig>(AppConfig);
        return new AppLogger(config, named);
      })
      .inTransientScope();
  }

  /**
   * bind controllers
   */
  private bindControllers() {
    this.container.bind(RootController).toSelf();
    this.container.bind(TodoController).toSelf();
  }

  /**
   * bind services
   */
  private bindServices() {
    this.container.bind(TodoService).toSelf();
  }
}
