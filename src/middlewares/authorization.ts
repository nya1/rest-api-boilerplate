import { Action } from 'routing-controllers';
import { AppIoC } from '@src/util/container';
import { AppLogger } from '@src/util/logger';

/**
 * sample user interface
 */
export interface User {
  email: string;
  apiKey: string;
  username: string;
}

/**
 * Authorization logic for endpoints marked with @Authorizated
 * See https://github.com/typestack/routing-controllers/#using-authorization-features
 */
export function authorizationChecker(action: Action, roles: string[]) {
  const logger = AppIoC.getNamed(AppLogger, 'authorizationChecker');
  logger.info(`check auth for roles: ${roles}`);
  const apiKey = action.request.headers['x-api-key'];
  return apiKey === 'test-api-key';
}

/**
 * return user info based on req/res, allows to inject user via @CurrentUser parameter
 * See @CurrentUser https://github.com/typestack/routing-controllers/#using-authorization-features
 */
export async function currentUserChecker(action: Action): Promise<User> {
  const logger = AppIoC.getNamed(AppLogger, 'currentUserChecker');
  logger.info('lookup example user');
  const apiKey = action.request.headers['x-api-key'];
  return {
    apiKey,
    email: 'test@example.com',
    username: 'example',
  };
}
