import { useContainer, useExpressServer, RoutingControllersOptions } from 'routing-controllers';
import { AppContainer, AppIoC } from '@src/util/container';
import { authorizationChecker, currentUserChecker } from '@src/middlewares/authorization';
import express from 'express';
import helmet from 'helmet';
import expressHttpLogger from 'express-winston';
import { AppConfig } from './util/config';
import { WinstonLoggerFactory } from './util/logger';

// create new app container and bind all utils, controllers, middlewares
const appContainer = new AppContainer();
appContainer.bindAll();

// set container
useContainer(AppIoC);

// create express app
const expressApp = express();

// attach basic security middlewares
// helmet
expressApp.use(helmet());

// add winston logger
const appConfig = AppIoC.get<AppConfig>(AppConfig);
const expressWinstonLogger = new WinstonLoggerFactory(appConfig);
expressApp.use(expressHttpLogger.logger(expressWinstonLogger.getRequestLogger()));

// base directory to load all files
const baseDir = __dirname;

// routing-controllers options
const routePrefix: string | undefined = appConfig.has('app.routePrefix')
  ? (appConfig.get('app.routePrefix') as string)
  : undefined;
export const routingControllersOptions: RoutingControllersOptions = {
  routePrefix,
  cors: true,
  // controllers and middlewares location
  controllers: [baseDir + '/controllers/*.{js,ts}'],
  middlewares: [baseDir + '/middlewares/*.{js,ts}'],
  // class validator options
  validation: {
    whitelist: true,
    forbidUnknownValues: true,
    forbidNonWhitelisted: true,
  },
  development: appConfig.isDev,
  authorizationChecker,
  currentUserChecker,
  defaultErrorHandler: false,
};

// add routing controller to current app
export const app = useExpressServer(expressApp, routingControllersOptions);
