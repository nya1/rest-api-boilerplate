import 'reflect-metadata';
import { useContainer, useExpressServer, RoutingControllersOptions } from 'routing-controllers';
import { AppContainer, AppIoC } from '@src/util/container';
import { authorizationChecker, currentUserChecker } from '@src/middlewares/authorization';
import express from 'express';
import helmet from 'helmet';
import { AppConfig } from './util/config';

// create new app container and bind all utils, controllers, middlewares
const appContainer = new AppContainer();
appContainer.bindAll();

// set container
useContainer(AppIoC);

// create express app
const expressApp = express();
// add helmet
expressApp.use(helmet());

// base directory to load all files
const baseDir = __dirname;

const appConfig = AppIoC.get<AppConfig>(AppConfig);

// routing-controllers options
const routePrefix: string | undefined = appConfig.has('app.routePrefix')
  ? (appConfig.get('app.routePrefix') as string)
  : undefined;
export const routingControllersOptions: RoutingControllersOptions = {
  routePrefix,
  // controllers and middlewares location
  controllers: [baseDir + '/controllers/*.{js,ts}'],
  middlewares: [baseDir + '/middlewares/*.{js,ts}'],
  // class validator options
  validation: {
    whitelist: true,
    forbidUnknownValues: true,
    forbidNonWhitelisted: true,
  },
  authorizationChecker,
  currentUserChecker,
};

// add routing controller to current app
export const app = useExpressServer(expressApp, routingControllersOptions);
