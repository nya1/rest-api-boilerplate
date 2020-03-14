import { AppContainer } from '@src/util/container';

// bind
const containerWithBind = new AppContainer();
containerWithBind.bindAll();

export const container = containerWithBind.container;
