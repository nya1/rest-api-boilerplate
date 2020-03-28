import { Container, interfaces } from 'inversify';
import { RootController } from '@src/controllers/root';
import { TodoController } from '@src/controllers/todo';
import { TodoService } from '@src/services/todo';
import { CustomErrorHandler } from '@src/middlewares/error-handler';
import { AppConfig } from './config';
import { AppLogger } from './logger';

export const AppIoC = new Container({ defaultScope: 'Singleton' });

/**
 * Container
 */
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
    this.bindMiddlewares();
    this.bindServices();
    this.bindControllers();
  }

  /**
   * bind utils
   */
  private bindUtils() {
    // config
    this.container.bind(AppConfig).toSelf();

    // logger bind and allow named binding to add more context to the logger
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

  private bindMiddlewares() {
    this.container.bind(CustomErrorHandler).toSelf();
  }

  /**
   * bind controllers
   */
  private bindControllers() {
    // https://stackoverflow.com/questions/50328582/how-to-dynamically-bind-a-dynamically-imported-type
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
