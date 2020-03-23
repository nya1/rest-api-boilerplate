import { AppConfig } from '@src/util/config';
import { app } from '@src/app';
import supertest, { agent } from 'supertest';

const appConfig = new AppConfig();

let fullUrl: string | null = null;

// compose and expose supertest object based on env variables,
// allows for typescript, compiled (js) and remote testing
const remoteTestUrl = process.env.SERVER_TEST_URL;

if (remoteTestUrl) {
  // remote url provided
  fullUrl = remoteTestUrl;
} else if (process.env.LOCAL_TESTING) {
  // testing against local JS server
  const port = appConfig.get<number>('app.port');
  fullUrl = 'http://localhost:' + port;
}

let request: supertest.SuperTest<supertest.Test>;

// check if we have a full url or not
if (!fullUrl) {
  console.log('loading typescript app into supertest');
  request = agent(app); // used for typescript
} else {
  console.log('loading full url into supertest:', fullUrl);
  request = agent(fullUrl);
}

export { request };
