import 'reflect-metadata';
import { useContainer, useExpressServer, RoutingControllersOptions } from 'routing-controllers';
import { AppContainer } from '@src/util/container';
import express from 'express';
import helmet from 'helmet';
import { AppConfig } from './util/config';

// create new app container and bind all utils, controllers, middlewares
const appContainer = new AppContainer();
appContainer.bindAll();

const appConfig = appContainer.container.get<AppConfig>(AppConfig);

// set container
useContainer(appContainer.container);

// create express app
const expressApp = express();
// add helmet
expressApp.use(helmet());

// base directory to load all files
const baseDir = __dirname;

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
};

// add routing controller to current app
export const app = useExpressServer(expressApp, routingControllersOptions);

export const container = appContainer.container;
